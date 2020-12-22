const port = 2018

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const database = require('./dataBase')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/produtos', (req,res,next) =>{
    res.send(database.getProdutos()) // Converter para json
})
app.get('/produtos/:id', (req,res,next) =>{
    res.send(database.getProduto(req.params.id))
})

app.post('/produtos', (req, res, next) =>{
    const produto = database.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco
    }) 
    res.send(produto) // JSON
})
app.delete('/produtos/:id', (req, res, next) =>{
    const produto = database.delProduto(req.params.id) 
    res.send(produto) // JSON
})

app.listen(port, ()=>{
    console.log(`Servidor executando na porta ${port}.`)
})
