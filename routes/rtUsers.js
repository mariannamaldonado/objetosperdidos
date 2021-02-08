const express = require('express')
const daoUsuarios = require('../dao/daoUsuarios')
const rtUsers = express.Router()
const daoUsuario = require('../dao/daoUsuarios')
const Usuario = require('../models/Usuario')
const mailer = require('../modules/mailer')
const fs = require('fs')



rtUsers.get('/nuevo', function(req, res) {
    res.render('usuarios/registrarse')
})


rtUsers.post('/guardar',(req,res)=>{
    daoUsuarios.guardar(req.body)
    // mailer.send(req.body.email) 
        .then(resp=>{
            res.render('usuarios/registrarse',{mensaje:resp})
        }) 
    
})


rtUsers.get('/comprobar/:pwd',async (req,res)=>{
    let pwd=req.params.pwd
    let u = await daoUsuario.getUsuarioByEmail('sagatzt@gmail.com')
    res.send("La comparación salió: " + await u.comprobarPwd(pwd))
})


rtUsers.get('/login', function (req, res){
    res.render('usuarios/login')
})


rtUsers.post('/login', (req,res)=>{
//    console.log(req.body)
   daoUsuarios.login(req.body)
        .then(respuesta=>{
            console.log(respuesta)
            if(respuesta.resultado==true)
                res.render('usuarios/login',{body:req.body,mensaje:"Password correcto"})
            else
                res.render('usuarios/login',{body:req.body,mensaje:"Password incorrecto"})

   })
        //por ejemplo si se cae el servicio de la base de dato
        .catch(err=>{
            res.render('login',{body:req.body,mensaje:"Algo salio mal"})
        })
        req.session.autenticado=true
})

module.exports= rtUsers