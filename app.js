const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Servidor Node.js funcionando');
});
const PORT = 5555;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
})