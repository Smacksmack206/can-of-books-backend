'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./Models/bookModel');
const { send } = require('express/lib/response');

const schema = {Book}

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

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
app.post('/books', handlePostBooks);

async function handleGetBooks(request, response) {
  try {
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

async function handlePostBooks (request, response){
  // client to send over new book that will match the shape of the BookModel
  // expect add to db
  // should come in on the request.body
  console.log(request.body);
  try {

    let newBook = await Book.create(request.body)
    response.status(201).send(newBook);
  } catch(error){
    response.status(500).send("Sorry, but your book could not be added. WOMP WOMP");
  }

}
app.listen(PORT, () => console.log(`listening on ${PORT}`));
