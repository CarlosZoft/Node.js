const schedule = require('node-schedule')

const tarefaOne = schedule.scheduleJob('*/5 * 12 * * 2',function(){
    console.log('Executando Tarefa 1!', new Date().getSeconds()); 
});

setTimeout(() => {
       tarefaOne.cancel()
       console.log('Cancelando Atividade 1!')
}, 20000);

const regra = new schedule.RecurrenceRule()

regra.dayOfWeek = [new schedule.Range(1,5)]
regra.hour = 16
regra.second = 50

const tarefaTwo = schedule.scheduleJob(regra, function(){
    console.log('Executando tarefa 2!', new Date().getSeconds())
})
