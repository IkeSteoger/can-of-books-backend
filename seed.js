'use strict';

const mongoose = require('mongoose');


require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed() {
  // title: { type: String, required: true },
  // description: { type: String, required: true },
  // status: { type: String, required: true },

  await Book.create({
    title: 'Game of Thrones',
    description: 'A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by American author George R. R. Martin.',
    status: 'A book and a tv show',
  });

  console.log('Book 1 was created');

  await Book.create({
    title: 'Wizard\'s First Rule',
    description: 'Wizard\'s First Rule, written by Terry Goodkind, is the first book in the epic fantasy series The Sword of Truth.',
    status: 'A book',
  });

  console.log('Book 2 was created');

  await Book.create({
    title: 'American Gods',
    description: 'American Gods (2001) is a fantasy novel by British author Neil Gaiman. The novel is a blend of Americana, fantasy, and various strands of ancient and modern mythology, all centering on the mysterious and taciturn Shadow.',
    status: 'A book and a tv show',
  });

  console.log('Book 3 was created');

  mongoose.disconnect();
}

seed();