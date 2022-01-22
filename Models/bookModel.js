'use strict';

const mongoose = require('mongoose');

// make an instance of a schema using mongoose and define the shape of your data record
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection
const { Schema } = mongoose;

// set up a model to represent the shape of the data we will be storing
const bookSchema = new Schema({
  // see mongoose for more 'types' of values https://mongoosejs.com/docs/schematypes.html

  title: String,
  description: String,
  status: String,
  email: String,
  image: String,
});

// create a model to export that you will use to make all instances of this collection
const Book = mongoose.model('Books', bookSchema);

module.exports = Book;