import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookmodel.js';

const app = express();

app.use(express.json());

app.get("/",(req, res)=>{
    return res.send("Welcome default")
});

// Route for GET all books from Database
app.get("/books",async (req,res)=>{
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });   
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
});

// Route for GET a specific book by ID
app.get("/books/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);

        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
});

// Route to create book in books-collection Database
app.post("/books",async (req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: "Send all required fields: title, author and publishYear"
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to Database");
    app.listen(PORT,()=>{
        console.log(`Server running at port: ${PORT}`)
    });
}).catch((error)=>{
    console.log(error);
})