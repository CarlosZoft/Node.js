const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/aprendendomongo", {useNewUrlParser : true,useUnifiedTopology : true});

const ArticleModel = require("./Articles");

const Article = mongoose.model("Article", ArticleModel);

const artigo = new Article({title : "MongoDB não relacional", author : "CarlosZoft", body : "JKASLKJS kasjk" })

artigo.save()
.then(res => console.log(res))
.catch(err => console.error(err));