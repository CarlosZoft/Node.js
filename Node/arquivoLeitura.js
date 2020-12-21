const fs = require('fs') // file system - core
const diretorio = __dirname + '/arquivo.json'
// sicrono...
// Não recomendado utilizar, travar event loop

const conteudo = fs.readFileSync(diretorio, 'utf-8')

console.log(conteudo)

// assincrono 

fs.readFile(diretorio, 'utf-8', (err, conteudo) => {
    const config = JSON.parse(conteudo)
    console.log(`${config.db.host}:${config.db.port}`)
})


const config = require('./arquivo.json')
console.log(config.db)

fs.readdir(__dirname, (err, arquivos)=>{
    console.log('conteudo da pasta...')
    console.log(arquivos)
})