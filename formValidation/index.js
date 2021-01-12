const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('express-flash');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(flash());

app.get("/", (req,res)=>{
    res.json("Aplicação está funcionando!")
})

app.listen(3000 ,(req,res) => {
    console.log("App running");
})
