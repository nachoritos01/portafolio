# 📊 GitHub Stats API

Aplicación Node.js + Frontend para visualizar estadísticas de commits de GitHub con gráficos interactivos.

## 🚀 Características

### Backend (Node.js + Express)
- **API REST** para obtener commits y estadísticas de GitHub
- **Paginación automática** para repositorios con muchos commits
- **Cache en memoria** (10 minutos) para optimizar rendimiento
- **Soporte para tokens** de GitHub (evita límites de rate)
- **Filtrado por fechas** (año, mes específico)

### Frontend (HTML + Chart.js)
- **Gráfico de barras interactivo** con estadísticas mensuales
- **Tema oscuro** acorde al portafolio
- **Click en barras** para ver commits del mes
- **Descarga de datos** en formato JSON
- **Responsive design** para móviles

## 📋 Requisitos

- Node.js v16+
- Token de GitHub (opcional, pero recomendado)

## 🛠️ Instalación

```bash
# Navegar al directorio del servidor
cd server

# Instalar dependencias
npm install

# Instalar nodemon para desarrollo (opcional)
npm install -g nodemon
```

## 🔧 Configuración

### Opción 1: Token como parámetro
```bash
node app.js --token=tu_github_token_aqui
```

### Opción 2: Variable de entorno
```bash
export GITHUB_TOKEN=tu_github_token_aqui
node app.js
```

### Opción 3: Sin token (límite básico)
```bash
npm start
# o
node app.js
```

## 🔑 Obtener Token de GitHub

1. Ve a [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Clic en "Generate new token (classic)"
3. Selecciona scopes: `repo` (para repos privados) o `public_repo` (solo públicos)
4. Copia el token generado

## 🌐 Uso

### Iniciar servidor
```bash
cd server
npm start
```

### Acceder a la aplicación
- **API Info**: http://localhost:3000
- **Frontend**: http://localhost:3000/portfolio.html

### Endpoints de la API

#### GET /stats
Obtiene estadísticas agregadas por mes
```bash
curl "http://localhost:3000/stats?user=nachoritos01&repo=portafolio&year=2024"
```

#### GET /commits
Obtiene lista de commits con filtros opcionales
```bash
# Todos los commits del año
curl "http://localhost:3000/commits?user=nachoritos01&repo=portafolio&year=2024"

# Commits de un mes específico
curl "http://localhost:3000/commits?user=nachoritos01&repo=portafolio&year=2024&month=8"
```

#### GET /download
Descarga datos en formato JSON
```bash
curl "http://localhost:3000/download?user=nachoritos01&repo=portafolio&year=2024" --output commits.json
```

## 📊 Funcionalidades del Frontend

### Gráfico Principal
- **Barras por mes** mostrando número de commits
- **Interactivo**: clic en barra para ver commits del mes
- **Responsive**: se adapta a pantallas móviles

### Estadísticas
- **Total de commits** del año
- **Mes más activo** 
- **Máximo de commits** en un mes
- **Promedio mensual** de commits

### Lista de Commits
- **Filtrado por mes** al hacer clic en el gráfico
- **SHA corto** del commit
- **Mensaje** del commit (primera línea)
- **Fecha y hora** formateada

### Descarga de Datos
- **Archivo JSON** con todos los commits
- **Metadatos** incluidos (usuario, repo, fecha de exportación)
- **Descarga directa** desde el navegador

## 🎨 Personalización

### Tema y Colores
El frontend usa las mismas variables CSS del portafolio:
```css
:root {
    --color-dark: #0a0a0a;
    --color-accent: #00ff88;
    --color-text-primary: #ffffff;
    /* ... */
}
```

### Configuración del Gráfico
Modifica las opciones de Chart.js en `portfolio.html`:
```javascript
currentChart = new Chart(ctx, {
    type: 'bar', // Cambiar a 'line' para gráfico de líneas
    data: chartData,
    options: {
        // Personalizar opciones aquí
    }
});
```

## 🔄 Cache y Rendimiento

- **Cache automático** de 10 minutos para evitar llamadas repetidas
- **Paginación eficiente** para repositorios grandes
- **Límites de rate** respetados automáticamente

### Con Token
- **5,000 requests/hora** 
- **Acceso a repos privados**

### Sin Token
- **60 requests/hora**
- **Solo repos públicos**

## 🚀 Deployment

### Desarrollo
```bash
npm run dev  # Usa nodemon para recarga automática
```

### Producción
```bash
npm start
```

### Variables de Entorno
```bash
PORT=3000
GITHUB_TOKEN=tu_token_aqui
NODE_ENV=production
```

## 📁 Estructura del Proyecto

```
server/
├── app.js              # Servidor principal
├── package.json        # Dependencias
├── README.md          # Esta documentación
└── public/
    └── portfolio.html  # Frontend con Chart.js
```

## 🐛 Troubleshooting

### Error: "API rate limit exceeded"
- Configura un token de GitHub
- Espera a que se restablezca el límite (1 hora)

### Error: "Repository not found"
- Verifica que el usuario y repositorio existan
- Si es privado, necesitas token con permisos adecuados

### Error: "No commits found"
- Verifica las fechas (año correcto)
- El usuario debe tener commits como autor en ese repo

## 📈 Ejemplo de Uso

```bash
# 1. Iniciar servidor con token
node app.js --token=ghp_xxxxxxxxxxxx

# 2. Abrir navegador
open http://localhost:3000/portfolio.html

# 3. Configurar:
#    - Usuario: nachoritos01
#    - Repo: portafolio  
#    - Año: 2024

# 4. Ver estadísticas y hacer clic en barras para detalles
```

## 🔗 Integración con Portafolio

Para incluir en tu portafolio Angular:
1. Copia el código del gráfico
2. Adapta los estilos a tu tema
3. Usa Angular HttpClient para consumir la API
4. Integra como componente adicional

¡Perfecto para mostrar tu actividad de desarrollo a reclutadores! 📊✨