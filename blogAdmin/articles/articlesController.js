const express = require('express');
const router = express.Router();
const Category = require('../categories/Category') 
const Article = require('./Article')
const slugify = require('slugify')


router.get("/admin/articles", (req, res)=>{
    Article.findAll({
        include: [{model: Category}]
    }).then(articles =>{ 
        res.render("../views/admin/articles/index", {articles: articles})
    });
    
});

router.get("/admin/articles/new", (req,res)=>{
    Category.findAll().then(categories => {
        res.render("../views/admin/articles/new", {categories : categories})
    })
    
})

router.post("/admin/articles/save", (req,res) =>{
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;

    Article.create({
        title: title,
        slug : slugify(title),
        body : body,
        categoryId : category
    }).then(()=>{
        res.redirect("/admin/articles")
    })

})
router.post("/articles/delete", (req,res)=>{
    const id = req.body.id;
    if(id!=undefined){
        if(!isNaN(id)){
            Article.destroy({where:{id :id}})
                .then( _ => { 
                    res.redirect("/admin/articles")
                })
        }
        else{
            res.redirect("/admin/articles")
        }
    }
    else{
        res.redirect("/admin/articles")
    }
});

module.exports = router;