const express = require('express')
const app = express()
// const session = require('expres-session')
const fileUpload = require('express-fileupload')
const rtMain = require('./routes/rtMain')
const rtUsers = require('./routes/rtUsers')
const rtObjetos = require('./routes/rtObjetos')
var exphbs  = require('express-handlebars')
const conexion = require('./conexion')



//configuración del motor de plantillas handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//middlewares
app.use(express.static(__dirname + '/public'))
app.use(fileUpload())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// app.use(session({
//     secret: 'miclavesecreta',
//     resave: false,
//     saveUninitialized: true,
// }))

// let rutasPrivadas=[
//     '/usuarios/unlogin',
//     '/objetos/mofificar',
//     'citas/registrar'
// ]

// app.use((req,res,next)=>{
//     console.log('')
// })
//enrutador principal
app.use('/',rtMain)
app.use('/usuarios',rtUsers)
app.use('/objetos',rtObjetos)

//base de datos mongodb
conexion.on('error',console.error.bind(console,"Error de conexion mongo")) // para saber si ha habido error
conexion.once('open',()=>console.log("Conexión mongo OK!!"))

//arrancamos el servidor:
app.listen(3000,(err)=>{
    console.log('Server run on port 3000')
})


 