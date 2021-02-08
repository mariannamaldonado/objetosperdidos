const express = require('express')
const rtObjetos = express.Router()
const Objeto = require('../models/Objeto')
const daoObjetos = require('../dao/daoObjetos')



 
rtObjetos.get('/nuevo', function (req, res) {
    res.render('objetos/formulario')
})

rtObjetos.post('/guardar', function (req, res) {
    console.log(req.body)
    if(req.files!=null){
        let f = req.files.foto
        f.mv(`./public/images/objetos/${f.name}`,err => {
            if(err) console.log(err)
            req.body.foto=req.files.foto.name
        })
    }
    daoObjetos.guardar(req.body)
        .then(resp=>{
            console.log(resp)
            res.render('objetos/formulario')})
})


rtObjetos.get('/listado', async function (req, res) {
    let misObjetos = await daoObjetos.listar()
    console.log(misObjetos)
    res.render('objetos/listado',{objetosPerdidos: misObjetos})
})



module.exports = rtObjetos