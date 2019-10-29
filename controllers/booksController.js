const express = require('express');
const router = express.Router();

// book model
const Book = require('../models/Book.js');

// display all friends list json
router.get('/getBooks', (req, res) => {

    Book.find({})
        .then(books => {
            res.send(books);
        })
        .catch(err => {
            res.send('No Books Found');
        });
});

// save book
router.post('/saveBook/', (req, res) => {

    Book.create(req.body)
        .then(savedBookReponse => {
            res.send(savedBookReponse)
        })
        .catch(err => {
            console.log(`POST /saveBook/ ERROR: ${err}`);
            res.sendStatus(500)
        });

});

// get all saved books
router.get('/getSavedBooks/', (req, res) => {

    Book.find({})
        .then(books => {
            res.send(books);
        })
        .catch(err => {
            console.log(`GET /getSavedBooks/ ERROR: ${err}`);
            res.sendStatus(500);
        });
});

// delete book by id
router.delete('/deleteBook/:id', (req, res) => {

    Book.findByIdAndRemove(req.params.id)
        .then(deletedBookResponse => {
            res.send(deletedBookResponse)
        })
        .catch(err => {
            console.log(`DELETE /deleteBook/ ERROR: ${err}`)
            res.sendStatus(500);
        });
});

module.exports = router;