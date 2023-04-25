'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const Book = require('./models/book.js')

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`listening on ${PORT}`));

mongoose.connect(process.env.DB_URL);

// *** BELOW CODE FOR TROUBLESHOOTING MongoDB IN TERMINAL ***
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

app.get('/test', (request, response) => {
  response.send('Test request received')
})

app.get('/books', async (request, response, next) => {
  try {

    let allBooks = await Book.find({});

    response.status(200).send(allBooks);
  } catch (error) {
    next(error);
  }
});

app.post('/books', postBook);

async function postBook(req, res, next) {
  try {
    let bookData = req.body;
    let createdBook = await Book.create(bookData);
    console.log(`${bookData} created`);
    res.status(201).send(createdBook);
  } catch (error) {
    next(error);
  }

}

app.delete('/books/:bookID', deleteBook);

async function deleteBook(req, res, next){
  try {
    // console.log(req.params);
    let id = req.params.bookID;

    await Book.findByIdAndDelete(id);

    res.status(200).send('Book was successfully deleted.')
    
  } catch (error) {
    next(error)
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});