'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./Models/bookModel');

const schema = {Book}

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// connecting to the cloud database called cats-database via the connection string in the .env
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// optional method that sends us a message
// more complicated but gives you a confirmation
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // start your server and look for the console.log in terminal to confirm connection
  console.log('Mongoose is connected')
});

app.get('/', (request, response) => {

  response.send('test request received')

})

app.get('/books', handleGetBooks);

async function handleGetBooks(request, response) {
  try {
    // an empty object tells us to find all the cats - no specifications
    // let catsFromDB = await Cat.find({});

    // updated to search for cats with a specific location
    // let booksFromDB = await Book.find({location: request.query.location});

    //final form
      let queryObj = {};
      if (request.query.status) {
        queryObj = {status: request.query.status}
      }
      let booksFromDB = await Book.find(queryObj);

    if (booksFromDB) {
      response.status(200).send(booksFromDB);
    } else {
      response.status(404).send('no books for you!');
    }
  } catch (error) {
    console.error(error);
    response.status(500).send('server error');
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
