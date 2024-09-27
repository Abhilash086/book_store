import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';

const app = express();

app.get("/",(req, res)=>{
    return res.status(200).send("Welcome default");
});

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database");
    app.listen(PORT, ()=>{
        console.log(`Server running at PORT ${PORT}`);
    });
}).catch((error)=>{
    console.log(error);
})

