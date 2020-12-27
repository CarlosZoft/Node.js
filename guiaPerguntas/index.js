const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/dataBase');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');
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
    Pergunta.findAll({ raw: true, order :[
        ['id','DESC']  
    ] }).then(perguntas =>{
        res.render("index",{ 
            perguntas: perguntas
        });
    })
    
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

app.get("/pergunta/:id", (req,res)=>{
    const id = req.params.id;    
    Pergunta.findOne({
        where: {id : id}
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where : {perguntaId : pergunta.id},
                order :[
                    ['id','DESC']  
                ]
            }).then(respostas =>{
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                }); 
            })
        }
        else{
            res.redirect("/");
        }
    })
    
})

app.post("/saveanswer", (req, res)=>{
    const corpo = req.body.corpo;
    const perguntaId = req.body.pergunta;
    Resposta.create({
        corpo : corpo,
        perguntaId : perguntaId
    }).then(()=>{
        res.redirect("/pergunta/" + perguntaId);
    })
})

app.listen(8520, () => {console.log("App Rodando!");});