const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create book schema
const bookSchema = new Schema({
    // using mongoose, _id is already incrementally defined
    bookID: { type: String, require: true },
    title: { type: String, require: true },
    author: String,
    description: String,
    imglink: String,
    rating: String,
    infolink: String,
    date: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);

// export Book model to controller
module.exports = Book;