const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');

app.listen((32423) ,(req,res) => {
    console.log("App running");
})

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser("popopo"))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash());

app.get("/", (req,res)=>{
    var emailError = req.flash("emailError")
    var nomeError = req.flash("nomeError")
    var idadeError =req.flash("idadeError")

    emailError  = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    nomeError  = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError;
    idadeError  = (idadeError == undefined || idadeError.length == 0) ? undefined : idadeError;

    res.render('index', {emailError,nomeError, idadeError});
})

app.post("/form", (req, res)=>{
    var {email, nome, idade} = req.body;
    var emailError,nomeError,idadeError;
    if(email == undefined || email == "" || email.length < 9)emailError = "Email is required";
    if(nome == undefined || nome == "" || nome.length < 4)nomeError = "Name is required";
    if(isNaN(idade) || idade == "" || idade < 18)idadeError ="Age is required Or age not permitted";

    if(emailError != undefined || idadeError != undefined){
        req.flash("emailError", emailError);
        req.flash("nomeError", nomeError);
        req.flash("idadeError", idadeError);
   
        res.redirect("/");
    }
    else{
        res.send("Enviado com sucesso")
    }
})


