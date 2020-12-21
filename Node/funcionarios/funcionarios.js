const url = 'http://files.cod3r.com.br/curso-js/funcionarios.json'
const axios = require('axios')

axios.get(url).then(response =>{
    const funcionarios = response.data
    const chinesa = china => china['pais'] === 'China'
    const mulher = feminino => feminino['genero'] === 'F'
    const salario = (dolar, atualDolar) =>{
       return dolar['salario'] < atualDolar['salario'] ? dolar : atualDolar;
    }
    
    console.log(funcionarios.filter(chinesa).filter(mulher).reduce(salario))
})
