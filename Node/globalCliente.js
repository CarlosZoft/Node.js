require('./global')

console.log(Utility.saudacao())
console.log(Utility.nome)   // Disponiveis em todos os módulos 
Utility.nome = 'different'
console.log(Utility.nome) // Possivel mudar em qualquer lugar (podemos congelar Utilizando a freeze())