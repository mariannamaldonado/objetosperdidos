const { getMaxListeners } = require('../models/Usuario')
const Usuario = require('../models/Usuario')

let daoUsuarios={}

//guardar
daoUsuarios.guardar=function guardar(usuario){
    return new Promise((resolved)=>{
        let u = new Usuario(usuario)
        u.save()
            .then(()=>{
            // mailer.send(u.email)
            resolved(u)
        })
        .catch(err=>resolved(err))
    })
}

daoUsuarios.getUsuarioByEmail=function getUsuarioByEmail(email){
    return new Promise((resolved, reject)=>{
        Usuario.findOne({email:email})
        .then(usuario=>resolved(usuario))
        .catch(err=> reject(err))
    })
    
}

daoUsuarios.login=function login(credenciales){
    return new Promise((resolved, reject)=>{
        daoUsuarios.getUsuarioByEmail(credenciales.email)
        .then(async usuario=>{
            // console.log(usuario)
                 // console.log(usuario.comprobarPwd(credenciales.password))
        //    let respuesta=await usuario.comprobarPwd(credenciales.password)
        //     console.log(respuesta)
        //     resolved(respuesta)
            if(usuario == null)

            resolved({resultado:false, mensaje:{usuario:'Este usuario no existe'}})
            else{
                let respuesta = await usuario.comprobarPwd(credenciales.password)
                if(respuesta)
                    resolved({resultado:respuesta, mensaje:'Usuario correcto'})
                else{
                    resolved({resultado:respuesta, mensaje:{password: 'La contraseña introducida es incorrecta'}})
                }
            }
        })
        .catch(err=>reject(err))
    })
}



// eliminar

//modidicar

//listar

module.exports = daoUsuarios