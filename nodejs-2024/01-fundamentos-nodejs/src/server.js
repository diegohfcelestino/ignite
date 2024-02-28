import http from 'node:http';

//GET => Buscar recurso no back-end
//POST => Criar um recurso no back-end
//PUT => Atualizar um recurso no back-end
//PATCH => Atualizar uma informação específica de um recurso no back-end
//DELETE => Deletar um recurso no back-end

//Stateful - Informações salvas em memórias
//Stateless - Informações salvas em banco de dados, arquivos, etc
//JSON - Javascript Object Notation
//Cabeçalhos (Requisição/resposta) => Metadados
//HTTP Status Code

const users = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;

  console.log(request.headers);

  if (method === 'GET' && url === '/users') {
    return response
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@exemple.com'
    });
    return response.writeHead(201).end();
  }
  return response.writeHead(404).end("Not Found");
});

server.listen(3333);