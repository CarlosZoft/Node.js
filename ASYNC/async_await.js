function pegaUsuarios(){
        return new Promise((resolve,reject) =>{
            setTimeout( () =>{
                resolve([
                    {name: "Carlos", years : "20"},
                    {name: "Rafael", years: "32"},
                    {name: "Shaco", years: "17"}
                 ])

            },3000) 
        })
}

/*pegaUsuarios().then(users =>{
    console.log(users)
});
*/
async function assincrono(){
        var usuarios = await pegaUsuarios();
        console.log(usuarios);
}

assincrono();