const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create book schema
const bookSchema = new Schema({
    // using mongoose, _id is already incrementally defined
    bookID: { type: String, require: true },
    title: { type: String, require: true },
    author: { type: String, require: true },
    description: String,
    imglink: String,
    rating: String,
    infolink: String,
    date: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);

// export to schema to controller for CRUD
module.exports = Book;