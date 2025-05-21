const mongoose = require("mongoose");

const Productos=mongoose.Schema({
    nombre:String,
    precio:Number,
    unidad:String,
    cantidad:Number,
    imagen:String,
    description:String,
    calidad:String,
    dany:String,
    createdAT:{type:Date,default:Date.now()}
})

module.exports=mongoose.model("Producto",Productos);