const express = require('express');

const server = express();

server.use(express.json());

server.listen(3000);

//Array de projetos

const projetos = [];

//Middleware

function contaRequisicoesRealizadasNoProjeto(req,res,next){
  console.count("Requisições realizadas");

  return next();
}

server.use(contaRequisicoesRealizadasNoProjeto);

function verificaSeProjetoExiste(req,res,next){
  const {id} = req.params;
  const projeto = projetos.find(x => x.Id == id);

  if(projeto != null)
  {
      return next();
  }

  return res.json({erro:"Projeto não existe.Informe outro ID"});
}

//Cria um projeto

server.post('/projects',(req,res) => {
  const {id} = req.body;
  const {title} = req.body;
  const {task} = req.body;

  var projeto = {
    Id :id,
    Title : title,
    Task: task
  };

  projetos.push(projeto);

  return res.json(projetos);

});

//Lista todos projetos

server.get('/projects',(req,res) =>{
  return res.json(projetos);
});

//Atualiza projeto

server.put('/projects/:id',verificaSeProjetoExiste,(req,res) =>{
  const {id} = req.params;
  const {title} = req.body;
  const {task} = req.body;

  const projeto = projetos.find(x => x.Id == id);
  projeto.Title = title;
  projeto.Task = task;
  return res.json(projeto);

});

//Deleta projeto

server.delete('/projects/:id',verificaSeProjetoExiste,(req,res)=>{
  const {id} = req.params;
  const projeto = projetos.find(x => x.Id == id);
  projetos.pop(projeto);
  return res.sendStatus(200);
})

//Insere uma Tarefa dentro do tipo

server.post('/projects/:id',verificaSeProjetoExiste,(req,res) =>{
  const {id} = req.params;
  const {task} = req.query;

  const projeto = projetos.find(x => x.Id == id);
  projeto.Task.push(task);

  return res.json(projeto);
})
