
import axios from 'axios';

export default {
    // get books from google api
    getBooks: function (searchInput) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);
    },
    // save book to mongodb
    saveBook: function (saveBookData) {
        return axios.post('/saveBook/', saveBookData);
    },
    // get saved books from mongodb
    getSavedBooks: function () {
        return axios.get('/getSavedBooks/');
    },
    // delete book from mongodb
    deleteBook: function (bookID) {
        return axios.delete(`/api/books/${bookID}`);
    },

};