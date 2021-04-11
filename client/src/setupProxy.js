const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', proxy({
    target: 'http://localhost:5000',
    changeOrigin: true,
  }));
  app.use('/devices', proxy({
    target: 'https://datamux.talkpool.io:8081',
    changeOrigin: true,
  }));
};