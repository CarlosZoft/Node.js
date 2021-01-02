const express = require('express');
const router = express.Router();
const Category = require('../categories/Category') 
const Article = require('./Article')
const slugify = require('slugify')


router.get("/admin/article", (req, res)=>{
    res.send("Rota de artigos")
});

router.get("/admin/article/new", (req,res)=>{
    Category.findAll().then(categories => {
        res.render("../views/admin/articles/new", {categories : categories})
    })
    
})

router.post("/admin/article/save", (req,res) =>{
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.Category;

    Article.create({
        title: title,
        slug : slugify(title),
        body : body,
        categoryId : category
    }).then(()=>{
        res.redirect("/admin/article")
    })

}) 

module.exports = router;