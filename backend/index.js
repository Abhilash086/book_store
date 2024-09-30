import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from "./routes/booksRoute.js"

const app = express();

app.use(express.json());
app.use("/books",booksRoute);

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
    console.log(error);
})