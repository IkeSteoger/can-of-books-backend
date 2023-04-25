'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const Book = require('./models/book.js')

const app = express();


// *** MIDDLEWARE ***
app.use(cors());
app.use(express.json())

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
  response.status(200).send('Welcome to Can of Books Backend!');
});

app.get('/test', (request, response) => {
  response.send('Test request received!')
})


// *** END POINT TO RETRIEVE BOOKS ***
app.get('/books', async (request, response, next) => {
  try {
    let allBooks = await Book.find({});

    response.status(200).send(allBooks);
  } catch (error) {
    next(error);
  }
});


// *** END POINT TO CREATE A BOOK ***
app.post('/books', postBook);

async function postBook(request, response, next){
  // console.log(request.body)
  try {
    let bookData = request.body;

    let createdBook = await Book.create(bookData);

    response.status(201).send(createdBook)
  } catch (error) {
    next(error);
  }
}

// *** END POINT TO DELETE A BOOK ***
app.delete('/books/:bookID', deleteBook)

async function deleteBook(request, response, next){
  // console.log(request.params)
  try {
    let id = request.params.bookID;

    await Book.findByIdAndDelete(id);

    response.status(200).send('Book deleted!');
  } catch(error) {
    next(error);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});