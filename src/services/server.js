import express from 'express';
import apiRouter from '../routes/index'
import path from 'path';
import * as http from 'http';
import { mongoose } from '../mongo/mongo';

 mongoose();
const app = express();
app.use(express.json());
app.use('/api',apiRouter);

app.use(function(err,req,res,next){
    return res.status('500').json({
        msg:'There was an unexpected error',
        error: err.message,
    })
})

const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));
const server = new http.Server(app);


export default app;