var fs = require('fs');
var path = require('path');

// Load environment variables from .env file
require('dotenv').config();

var sonarProperties = `
sonar.projectKey=${process.env.SONAR_PROJECT_KEY}
sonar.sources=${process.env.SONAR_SOURCES}
sonar.host.url=${process.env.SONAR_HOST_URL}
sonar.token=${process.env.SONAR_TOKEN}
`;

fs.writeFileSync('sonar-project.properties', sonarProperties);
console.log('sonar-project.properties file generated successfully.');