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

router.get("/admin/articles/edit/:id", (req, res)=>{
    const id = req.params.id;
    Article.findByPk(id).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render("../views/admin/articles/edit", {categories: categories, article : article})
            })
          
        }
        else{
            res.redirect("/")
        }
    })
    .catch(err =>{ 
        res.redirect("/")
    })
});
router.post("/articles/update", (req,res)=>{
      const id = req.body.id;
      const title = req.body.title;
      const body = req.body.body;
      const category = req.body.category;

      Article.update({title : title , body: body , categoryId : category , slug: slugify(title)},{
          where : { 
              id : id
          }
      }).then(() =>{
          res.redirect("/admin/articles")
      }) 
      .catch(()=>{
          res.redirect("/")
      }) 
});

router.get("/articles/page/:num", (req,res)=>{
    var page = req.params.num;
    var offset = 0;
    if(isNaN(page) || page == 1){
        offset = 0;
    }
    else{
        offset = (parseInt(page)-1) * 4;
    }

    Article.findAndCountAll({
        limit : 4,
        offset: offset,
        order:[
            ['id', 'DESC']
        ]
    }).then(articles =>{
        var next
        if(offset + 4 >= articles.count){
            next = false;
        }
        else{
            next = true;
        }
        var result = {
            page: parseInt(page),
            next : next,
            articles : articles,
        }

        Category.findAll().then(categories =>{
            res.render("../views/admin/articles/page", {categories :categories, result : result})
        })
    })

})



module.exports = router;