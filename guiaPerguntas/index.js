const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/dataBase');
const Pergunta = require('./database/Pergunta')
//Database

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão Bem sucedida")
    })
    .catch((err)=>{
        console.log(err);
    })


// Usando o EJS como view engine

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Body parser

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// Rotes

app.get("/", (req,res) =>{
   
    res.render("index");
});

app.get("/perguntar", (req,res)=>{
    res.render("perguntar");
})

app.post("/saveask", (req,res)=>{
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    Pergunta.create({
        titulo : titulo,
        descricao : descricao
    }).then(()=>{
        res.redirect("/");
    })
    .catch(()=> res.redirect("/perguntar"))
  
})

app.listen(8520, () => {console.log("App Rodando!");});