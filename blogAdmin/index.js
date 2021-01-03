const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const session = require('express-session');

const categoriesController = require('./categories/categoriesController');
const articlesController = require('./articles/articlesController');
const userscontroller = require('./Admin/UserController')

const Article = require("./articles/Article");
const Category = require('./categories/Category');

//sessions 

app.use(session({
    secret: "29zum9298j",
    cookie: {MaxAge: 30000000}
}))

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
// users 
app.use("/", userscontroller)

app.get("/", (req,res)=>{
    Article.findAll({
        order:[
            ['id', 'DESC']
        ],
        limit : 4
    }).then(articles =>{
        Category.findAll().then(categories =>{
            res.render("index", {articles : articles, categories: categories});
        })
    })
})
app.get("/:slug", (req,res)=>{
    const slug = req.params.slug;
    Article.findOne({
        where : {slug : slug}
    })
    .then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render("read", {article : article, categories: categories});
            })
        }
        else {
            res.redirect("/");
        }
    })
    .catch( err =>{
        res.redirect("/");
    })
})

app.get("/category/:slug", (req,res)=>{
    const slug = req.params.slug;

    Category.findOne({
        where :  {slug : slug},
        include: [{model : Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories =>{
               res.render("index", {articles : category.articles, categories : categories})
            })
        }
        else{
            res.redirect("/");
        }       
    }).catch(_=>{
        res.redirect("/");
    })

})

app.listen(3333, ()=>{
    console.log('Rodou!!');
})

