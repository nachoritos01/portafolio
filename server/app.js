const express = require('express');
const cors = require('cors');
const axios = require('axios');
const NodeCache = require('node-cache');
const path = require('path');

const app = express();
const cache = new NodeCache({ stdTTL: 600 }); // Cache por 10 minutos

// Configuración
const PORT = process.env.PORT || 3000;
const GITHUB_TOKEN = process.argv.find(arg => arg.startsWith('--token='))?.split('=')[1] || process.env.GITHUB_TOKEN;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Headers para GitHub API
const getGitHubHeaders = () => {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'GitHub-Stats-App'
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }
  
  return headers;
};

// Función para obtener todos los commits con paginación
async function getAllCommits(user, repo, since, until) {
  const cacheKey = `commits_${user}_${repo}_${since}_${until}`;
  const cached = cache.get(cacheKey);
  
  if (cached) {
    console.log(`✅ Cache hit para ${cacheKey}`);
    return cached;
  }

  console.log(`🔄 Obteniendo commits para ${user}/${repo} desde ${since} hasta ${until}`);
  
  let allCommits = [];
  let page = 1;
  const perPage = 100;

  try {
    while (true) {
      const response = await axios.get(`https://api.github.com/repos/${user}/${repo}/commits`, {
        headers: getGitHubHeaders(),
        params: {
          author: user,
          since: since,
          until: until,
          per_page: perPage,
          page: page
        }
      });

      const commits = response.data;
      
      if (commits.length === 0) break;
      
      // Procesar commits
      const processedCommits = commits.map(commit => ({
        sha: commit.sha,
        message: commit.commit.message.split('\n')[0], // Solo primera línea
        date: commit.commit.author.date,
        author: commit.commit.author.name,
        url: commit.html_url
      }));

      allCommits = allCommits.concat(processedCommits);
      
      console.log(`📄 Página ${page}: ${commits.length} commits obtenidos`);
      
      if (commits.length < perPage) break;
      page++;
    }

    console.log(`✅ Total de commits obtenidos: ${allCommits.length}`);
    
    // Guardar en cache
    cache.set(cacheKey, allCommits);
    
    return allCommits;
    
  } catch (error) {
    console.error('❌ Error al obtener commits:', error.response?.data || error.message);
    throw error;
  }
}

// Endpoint: GET /commits
app.get('/commits', async (req, res) => {
  try {
    const { user, repo, month, year = '2025' } = req.query;
    
    if (!user || !repo) {
      return res.status(400).json({ 
        error: 'Parámetros user y repo son requeridos' 
      });
    }

    // Filtros de fecha
    let since, until;
    
    if (month) {
      // Filtrar por mes específico
      const monthNum = parseInt(month);
      since = new Date(year, monthNum - 1, 1).toISOString();
      until = new Date(year, monthNum, 0, 23, 59, 59).toISOString();
    } else {
      // Todo el año
      since = `${year}-01-01T00:00:00Z`;
      until = `${year}-12-31T23:59:59Z`;
    }

    const commits = await getAllCommits(user, repo, since, until);
    
    res.json({
      user,
      repo,
      year,
      month: month || 'all',
      total: commits.length,
      commits
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener commits',
      details: error.response?.data?.message || error.message
    });
  }
});

// Endpoint: GET /stats
app.get('/stats', async (req, res) => {
  try {
    const { user, repo, year = '2025' } = req.query;
    
    if (!user || !repo) {
      return res.status(400).json({ 
        error: 'Parámetros user y repo son requeridos' 
      });
    }

    const since = `${year}-01-01T00:00:00Z`;
    const until = `${year}-12-31T23:59:59Z`;
    
    const commits = await getAllCommits(user, repo, since, until);
    
    // Agrupar commits por mes
    const monthlyStats = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
      7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0
    };

    commits.forEach(commit => {
      const date = new Date(commit.date);
      const month = date.getMonth() + 1; // getMonth() devuelve 0-11
      monthlyStats[month]++;
    });

    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const chartData = {
      labels: monthNames,
      datasets: [{
        label: `Commits ${year}`,
        data: Object.values(monthlyStats),
        backgroundColor: 'rgba(0, 255, 136, 0.2)',
        borderColor: 'rgba(0, 255, 136, 1)',
        borderWidth: 2,
        fill: true
      }]
    };

    res.json({
      user,
      repo,
      year,
      totalCommits: commits.length,
      monthlyStats,
      chartData,
      summary: {
        mostActiveMonth: monthNames[Object.values(monthlyStats).indexOf(Math.max(...Object.values(monthlyStats)))],
        maxCommitsInMonth: Math.max(...Object.values(monthlyStats)),
        avgCommitsPerMonth: Math.round(commits.length / 12 * 100) / 100
      }
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener estadísticas',
      details: error.response?.data?.message || error.message
    });
  }
});

// Endpoint: GET /download
app.get('/download', async (req, res) => {
  try {
    const { user, repo, year = '2025' } = req.query;
    
    if (!user || !repo) {
      return res.status(400).json({ 
        error: 'Parámetros user y repo son requeridos' 
      });
    }

    const since = `${year}-01-01T00:00:00Z`;
    const until = `${year}-12-31T23:59:59Z`;
    
    const commits = await getAllCommits(user, repo, since, until);
    
    const filename = `commits_${user}_${repo}_${year}.json`;
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    res.json({
      metadata: {
        user,
        repo,
        year,
        totalCommits: commits.length,
        exportDate: new Date().toISOString()
      },
      commits
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Error al descargar datos',
      details: error.response?.data?.message || error.message
    });
  }
});

// Ruta para servir el frontend
app.get('/portfolio.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'portfolio.html'));
});

// Info de la API
app.get('/', (req, res) => {
  res.json({
    name: 'GitHub Stats API',
    version: '1.0.0',
    endpoints: {
      '/commits': 'GET - Obtener commits (params: user, repo, month?, year?)',
      '/stats': 'GET - Obtener estadísticas (params: user, repo, year?)',
      '/download': 'GET - Descargar datos JSON (params: user, repo, year?)',
      '/portfolio.html': 'GET - Frontend de visualización'
    },
    usage: {
      token: GITHUB_TOKEN ? '✅ Configurado' : '❌ No configurado (límite de rate más bajo)',
      rateLimit: GITHUB_TOKEN ? '5000 req/hora' : '60 req/hora'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('🚀 GitHub Stats API iniciado');
  console.log(`📍 Servidor: http://localhost:${PORT}`);
  console.log(`🎨 Frontend: http://localhost:${PORT}/portfolio.html`);
  console.log(`🔑 Token: ${GITHUB_TOKEN ? '✅ Configurado' : '❌ No configurado'}`);
  console.log('');
  console.log('Endpoints disponibles:');
  console.log(`  GET /stats?user=nachoritos01&repo=portafolio&year=2025`);
  console.log(`  GET /commits?user=nachoritos01&repo=portafolio&month=8&year=2025`);
  console.log(`  GET /download?user=nachoritos01&repo=portafolio&year=2025`);
});

module.exports = app;