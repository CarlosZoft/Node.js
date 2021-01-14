const express = require('express');
const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.set('view engine', 'ejs');

app.get("/", (req, res) =>{
    res.render("index")
})

io.on("connection",(client) => {

    client.on("disconnect", () =>{
        console.log("X desconectou" + client.id)
    })


    client.on("msg", (data)=>{
        io.emit("showmsg", data)
        console.log(data);
    })

})








http.listen(3678, () => {
    console.log("app running");
})