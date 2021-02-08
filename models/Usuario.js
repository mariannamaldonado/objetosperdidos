const mongoose = require("mongoose")
const {Schema} = mongoose  //importamos una clase llamada schema
const beautifyUnique = require('mongoose-beautiful-unique-validation')
const bcrypt = require('bcrypt')


const schemaUsuario = new Schema({
    nombre: {type:String, require:true},
    email: {
        type:String,
         required: [true, 'el email es obligatorio'],
         index: true, 
         unique: 'el email {{value}} esta duplicado'
        },
    password: {type:String, required:[true, 'password es obligatorio']},
    activo: {type:Boolean, default:false}
    
})

schemaUsuario.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(hash=>{
            this.password = hash
            next()
        })
})

class Usuario{

    //constructor

    
     //getter y los setter
get errores(){
    let errores=[]
    if(this.email=="") errores.push({error:"email vacío, es obligatorio"})
    if(this.password=="") errores.push({error:"password vacio, es obligatorio"})
    return errores
    }
   
    //metodos otros
//     set user()

//     set password(password){
//         this.userpass=`**${password}**`
//     }
// }

 //privados
    comprobarPwd(password){
        //devuelve true si el password esta vacio y false si
        return bcrypt.compare(password, this.password)
            .then(res=>{return res})
    }
}

schemaUsuario.loadClass(Usuario)
schemaUsuario.plugin(beautifyUnique)
module.exports=mongoose.model('usuario',schemaUsuario)