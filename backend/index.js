import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';

const app = express();

app.get("/",(req, res)=>{
    return res.send("Welcome default")
});

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to Database");
    app.listen(PORT,()=>{
        console.log(`Server running at port: ${PORT}`)
    });
}).catch((error)=>{
    console.log({message: error.message});
})