const contador = require('./instanciaUnica')
const contador2 = require('./instanciaUnica')

const contador3 = require('./instanciaNova')()
const contador4 = require('./instanciaNova')()

contador.inc()
contador.inc()

console.log(contador2.valor)//cache 

contador3.inc()
contador3.inc()

console.log(contador4.valor)// factory funcion xD
