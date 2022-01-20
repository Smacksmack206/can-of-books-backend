'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./models/bookModel');

mongoose.connect(process.env.DB_URI);

// seed the database with some cats, so I can retrieve them
// a function that connects to the db, adds some cats and then disconnects from the db
async function seed() {
  // option 1
  const myBook = new Book({
    title: 'Some other book my guy',
  description: 'somerandom description fa sho',
  status: 'Available',
  email: 'Cedric@devhub.com',
  });
  await myBook.save(function (err) {
    if (err) console.error(err);
    else console.log('saved Some other book my guy');
  });

  // alternately...
  await Book.create({
    title: 'Somebook my guy',
  description: 'somerandom description',
  status: 'Available',
  email: 'Cedric@devhub.com',
  });

  console.log('saved Somebook my guy');

  await Book.create({
    title: 'Somebook new my guy',
  description: 'some newer random description',
  status: 'Available',
  email: 'Cedric@devhub.com',
  });

  console.log('saved Some newer book my guy');

  mongoose.disconnect();
}




seed();

// to seed the db:
// make sure your server is not running
// in terminal go to project root
// type `node seed.js` in your terminal
// go to mongo atlas, view collections and look for your new cats