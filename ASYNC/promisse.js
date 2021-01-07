function enviarEmail(body,destiny) {
    return new Promise ((resolve,reject) => {
        setTimeout(()=>{
             var Error = false;
            if(!Error){
                resolve( )
            }
            else {
                reject( )
            }
        }, 8000)
    })
}

console.log("inicio de envio de e-mail!")
enviarEmail("Bom dia !", "Carlos Zoft").then(()=>{
    console.log("Email enviado")
})
.catch(Error=> console.log("Email não enviado"))
