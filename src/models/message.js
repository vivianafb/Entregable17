import  Mongoose from "mongoose";

const mensajeCollection = 'mensajes';

const mensajesSchema = new Mongoose.Schema({
    usuario: {type: String, required: true},
    mensaje: {type: String, required:true,unique: true}
},{ versionKey: false })

export const mensajes = new Mongoose.model(mensajeCollection,mensajesSchema);