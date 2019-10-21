import React, { Component } from 'react';
import { TextInput, Button, Icon, Card } from 'react-materialize';

// api
import axios from 'axios';
import API from '../../utils/API.js';

export default class SearchPage extends Component {

    state = {
        searchInput: '',
        searchResults: [],
        isSearched: false,
    };

    // user input
    handleChange = event => {
        this.setState({ searchInput: event.target.value });
    };

    // get google books api
    getBooks = event => {
        event.preventDefault();

        const searchInput = this.state.searchInput.trim();

        // get books from google api
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
            .then(res => this.setState({ searchResults: res.data.items }))
            .catch(err => console.log(err));
    };

    // save book to mongo db
    saveBook = event => {
        event.preventDefault();

        const saveBookData = {
            bookID: event.target.dataset.id,
            title: event.target.dataset.title,
            author: event.target.dataset.author,
            description: event.target.dataset.description,
            imglink: event.target.dataset.imglink,
            rating: event.target.dataset.rating,
            infolink: event.target.dataset.infolink,
        };

        API.saveBook(saveBookData)
            .then(saveBookResponse => console.log(`API saveBook SUCCESS: ${JSON.stringify(saveBookResponse.data)}`))
            .catch(err => console.log(`API saveBook ERROR: ${err}`));
    };

    render() {
        return (
            <div className="container">
                <form className="col-md-12">
                    <TextInput label='Search for a book...'
                        value={this.state.searchInput} onChange={this.handleChange}
                    />
                    <Button type='submit' waves='light'
                        onClick={this.getBooks}
                    >
                        Submit
                        <Icon right>
                            send
                        </Icon>
                    </Button>
                </form>

                {
                    this.state.searchResults && this.state.searchResults.length > 0 ?

                        <div className="row mt-5">
                            {/* map through array of objects and create card */}
                            {
                                this.state.searchResults.map(book => (
                                    <Card className="container"
                                        key={`result-card-${book.id}`}
                                        actions={
                                            [
                                                <Button key={`result-view-${book.id}`}><a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">View</a></Button>,
                                                <Button
                                                    key={`result-save-${book.id}`}
                                                    data-id={book.id}
                                                    data-title={book.volumeInfo.title}
                                                    data-author={book.volumeInfo.authors[0]}
                                                    data-imglink={book.volumeInfo.imageLinks.smallThumbnail ? book.volumeInfo.imageLinks.smallThumbnail : ''}
                                                    data-rating={book.volumeInfo.averageRating ? book.volumeInfo.averageRating : ''}
                                                    data-description={book.volumeInfo.description}
                                                    data-infolink={book.volumeInfo.infoLink}
                                                    onClick={this.saveBook}
                                                > Save</Button >

                                            ]
                                        }
                                    >
                                        <div className="row">
                                            <div className="col-md-3">
                                                <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="" className="imgclass" />
                                            </div>
                                            <div className="col-md-9">
                                                <h6>{book.volumeInfo.title}</h6>
                                                <p>Author: {book.volumeInfo.authors[0]}</p>
                                                <p>Rating: {book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'No Rating'}</p>
                                                <p>Desc: {book.volumeInfo.description}</p>
                                            </div>
                                        </div>
                                    </Card >
                                ))
                            }
                        </div>

                        : 'nothing'
                }
            </div>

        )
    }
}