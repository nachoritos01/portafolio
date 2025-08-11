var env = require('process').env;

var target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7184';

var PROXY_CONFIG = [
  {
    context: [
      "/api/**",
      "/Auth/Login",
      "/Auth/AssertionConsumerService",
      "/Auth/Logout",
      "/Auth/LoggedOut",
      "/Auth/SingleLogout",
      "/Metadata/**",
      "/EnvInfo/**"
    ],
    target,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
