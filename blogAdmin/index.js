const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const categoriesController = require('./categories/categoriesController');
const articlesController = require('./articles/articlesController')
//view engine 
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

//body-parser 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Database 

connection
    .authenticate()
    .then(()=> console.log('conexão sucedida com o banco de dados'))
    .catch(err => console.log(err))

// categories
app.use("/", categoriesController)
// articles
app.use("/", articlesController)

app.get("/", (req,res)=>{
    res.render("index");
})

app.listen(3333, ()=>{
    console.log('Rodou!!');
})

