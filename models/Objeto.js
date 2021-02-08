const mongoose = require("mongoose")
const {Model, Schema} = mongoose  //importamos una clase llamada schema

const schemaObjeto = new Schema({
    nombre: {type:String, required: true},
    fecha: {type:String, required: true},
    telefono: {type:String, required:true},
    titulo:{type:String},
    descripcion:{type:String},
    // foto:{type:String}
    foto:{type:String, default:'/default.png'}
})

class Objeto extends Model{


    // constructor(objeto){
    

    get errores(){
        let errores=[]
        if(this.nombre=="") errores.push({error:"Nombre vacío, es obligatorio."})
        if(this.telefono=="") errores.push({error:"Telefono vacío, es obligatorio"})
        return errores
    }
    //metodos privados
}

schemaObjeto.loadClass(Objeto)
module.exports=mongoose.model('Objeto',schemaObjeto)