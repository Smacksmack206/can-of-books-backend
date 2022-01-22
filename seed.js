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
    title: 'Lord of The Rings: The Fellowship of the Ring',
    description: 'The first book of the LOTR Trilogy',
    status: 'Available',
    email: 'Cedric@devhub.com',
    image: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29.jpg',
  });
  await myBook.save(function (err) {
    if (err) console.error(err);
    else console.log('Book 1 ' + myBook);
  });

  // alternately...
  await Book.create({
    title: 'Lord of The Rings: The Two Towers',
    description: 'The second book of the LOTR Trilogy',
    status: 'Available',
    email: 'Cedric@devhub.com',
    image: 'https://upload.wikimedia.org/wikipedia/en/d/d0/Lord_of_the_Rings_-_The_Two_Towers_%282002%29.jpg',
  });

  console.log('Book 2 ' + myBook.title);

  await Book.create({
    title: 'Lord of The Rings: The Return of the King',
    description: 'The final book of the LOTR Trilogy',
    status: 'Available',
    email: 'Cedric@devhub.com',
    image: 'https://upload.wikimedia.org/wikipedia/en/b/be/The_Lord_of_the_Rings_-_The_Return_of_the_King_%282003%29.jpg',
  });

  console.log('Book 3 ' + myBook.title);

  mongoose.disconnect();
}




seed();

// to seed the db:
// make sure your server is not running
// in terminal go to project root
// type `node seed.js` in your terminal
// go to mongo atlas, view collections and look for your new cats