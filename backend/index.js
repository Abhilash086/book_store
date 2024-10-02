import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

// Middleware for handeling CORS policy
// Option 1: Allow all origins with default of cors(*)
app.use(cors());

// Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000/',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// );

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