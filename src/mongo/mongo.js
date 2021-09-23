import { connect } from "mongoose";
const URL = 'mongodb://viviana:123456@localhost:27017/ecommerce';

export const mongoose = async () => {
    try {
        await connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB Conectada");

    }catch(e){
        console.log("error: ",e)
    }
}