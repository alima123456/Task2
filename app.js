const http = require('http');

const app = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from jenkins-demo-app! CI/CD with Jenkins works.\n');
});

module.exports = app;
