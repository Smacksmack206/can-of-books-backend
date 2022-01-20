'use strict'; 

// the purpose of this file is to hold a function that will clear our database of all data. 
// this is helpful when in development and working with seeded (fake) data

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URI);
const Book = require('./models/bookModel');

// write a function that connects to the db
// uses the  `.deleteMany` method on the cats collection with no object properites specified
// disconnect from the db
async function clear() {
  try {
    await Book.deleteMany({});
    console.log('Books cleared!');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
}

clear();

// to clear the db:
// make sure your server is not running
// in terminal go to the project root
// type `node clear.js`