const http = require('http')
const socketIo = require('socket.io')
const port = 1267;

const handler = function(req,res){
    const defaultRoute = async (req, res) => res.end('Hello!');

    return defaultRoute(req, res);
}

const server = http.createServer(handler)
const io = socketIo(server, {
    cors : {
        origin : "*",
        credentials: false
    }
})

io.on("connection", socket => console.log('someone connected', socket.id))
const interval = setInterval(() =>{
    io.emit('file-uploaded', 5e6)
}
, 250)

server.listen(port, () =>{
    console.log("app running at http://localhost:"+ port)
});