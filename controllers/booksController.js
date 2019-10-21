const express = require('express');
const router = express.Router();

// book model
const Book = require('../models/Book.js');

// display all friends list json
router.get('/getBooks', (req, res) => {
    Book.find({})
        .then(books => {
            console.log('finding books');
            console.log(books);
            res.send(books);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/saveBook/', (req, res) => {
    console.log(req.body)
    Book.create(req.body)
        .then(savedBookReponse => {
            console.log(`POST /saveBook/ SUCCESS: ${savedBookReponse}`);
            res.send(savedBookReponse)
        })
        .catch(err => {
            console.log(`POST /saveBook/ ERROR: ${err}`);
            res.sendStatus(500)
        });

});

router.get('/getSavedBooks/', (req, res) => {

    Book.find({})
        .then(books => {
            console.log('finding books');
            console.log(books);
            res.send(books);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.delete('/deleteBook/:id', (req, res) => {
    // console.log(req.params.id);
    Book.findByIdAndRemove(req.params.id)
        .then((deletedBookResponse) => {
            res.send(deletedBookResponse)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500);
        })
})

module.exports = router;