function enviarEmail(body,destiny) {
    setTimeout(()=>{
        console.log(`
        Para :${destiny}
        ----------------------------------------------------------------
        ${body}
        
        `)
    }, 8000)
}
console.log("inicio de envio de e-mail!")
enviarEmail("Bom dia !", "Carlos Zoft");
console.log("E-mail enviado!")