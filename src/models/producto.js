import  Mongoose from "mongoose";

const productoCollection = 'productos';

const productosSchema = new Mongoose.Schema({
    nombre: {type: String, required: true},
    precio: {type: Number, required:true},
    descripcion:{type: String, required:true, unique: true},
    codigo: {type: Number, required:true},
    foto: {type: String, required:true},
    stock: {type: Number, required:true}

},{ versionKey: false })

export const productos = new Mongoose.model(productoCollection,productosSchema);