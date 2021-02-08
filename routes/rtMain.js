const express = require('express')
const rtMain = express.Router()
// const daoObjetos = require('../dao/daoObjetos')
// const Objeto = require('../models/Objeto')



rtMain.get('/', function (req, res) {
    res.render('home')
})


module.exports = rtMain