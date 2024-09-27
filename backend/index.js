import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import { Book } from './models/bookmodel.js';

const app = express();

app.use(express.json());

app.get("/",(req, res)=>{
    return res.status(200).send("Welcome default");
});

// Route for save a new book
app.post("/books",async (req,res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            res.status(400).send({message: "Send all required fields: title, author and publishYear"});
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);

        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

app.get("/books",async (req,res)=>{
    try {
        const books = await Book.find({});

        return res.status(200).send({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database");
    app.listen(PORT, ()=>{
        console.log(`Server running at PORT ${PORT}`);
    });
}).catch((error)=>{
    console.log(error);
})

