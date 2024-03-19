import http from 'node:http';

import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';


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

// Query Parameters: -> Parametros nomeados - usado na URL Stateful => filtros paginação, não obrigatórias
// Route Parameters: -> Parametros não nomeados e que ficam na url, para identificar recurso
// Request Body: Envio de informações como por exemplo de um formulário (HTTPs)

//

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(route => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);