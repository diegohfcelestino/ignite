import http from 'node:http';

const server = http.createServer((request, response) => {
  return response.end("Olá mundo");
});

server.listen(3333);