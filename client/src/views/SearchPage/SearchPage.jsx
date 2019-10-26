import React, { Component } from 'react';
import { TextInput, Button, Icon, Card } from 'react-materialize';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../components/Header/Header.jsx';

// api
import axios from 'axios';
import API from '../../utils/API.js';
import { Container } from 'react-materialize';

export default class SearchPage extends Component {

    state = {
        searchInput: '',
        searchResults: [],
        isSearched: false,
        savedBookIndex: -1,
        isLoading: false,
        message: '',
    };


    componentDidMount() {
        this.setState({
            isLoading: false,
            message: 'Type a book below...',
        });
    };

    toastId = null;
    notifySuccess = (toastMessage) => this.toastId = toast.success(toastMessage, { position: toast.POSITION.BOTTOM_RIGHT });
    notifyInfo = (toastMessage) => this.toastId = toast.info(toastMessage, { position: toast.POSITION.BOTTOM_RIGHT });

    // user input
    handleChange = event => {
        this.setState({
            searchInput: event.target.value,
            isLoading: true,
        });

    };

    // get google books api
    getBooks = event => {
        event.preventDefault();

        const searchInput = this.state.searchInput.trim();

        if (searchInput === '') {
            this.notifyInfo('Try typing in a book!');
        }

        // get books from google api
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
            .then(res => this.setState({
                searchResults: res.data.items,
                message: 'View or Save a book below!',
                isLoading: false
            }))
            .then(() => this.notifySuccess(`'${searchInput}' searched!`))
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

        this.setState({
            isLoading: true,
            savedBookIndex: event.target.dataset.bookindex,
        });

        API.saveBook(saveBookData)
            .then(saveBookResponse => console.log(`API saveBook SUCCESS: ${JSON.stringify(saveBookResponse.data)}`))
            .catch(err => console.log(`API saveBook ERROR: ${err}`))
            .then(() => {

                // remove saved book from search view
                const newSearchList = []

                this.state.searchResults.forEach((value, index) => {
                    if (index !== Number(this.state.savedBookIndex)) {
                        newSearchList.push(value);
                    }
                });

                this.setState({
                    searchResults: newSearchList,
                    isLoading: false
                });

            });
    };

    render() {
        return (
            <>

                <Header message={this.state.message} />

                <Container className="mt-5">
                    <div className="row p-5">
                        <form className="col-md-12">
                            <TextInput
                                label='Search for a book...'
                                value={this.state.searchInput}
                                onChange={this.handleChange}
                            />
                            <Button
                                type='submit'
                                waves='light'
                                onClick={this.getBooks}
                            >
                                Submit
                        <Icon right>
                                    send
                        </Icon>
                            </Button>

                        </form>
                    </div>


                    {
                        this.state.searchResults && this.state.searchResults.length > 0 ?

                            <Container className="mt-5">
                                {/* map through array of objects and create card */}
                                {
                                    this.state.searchResults.map((book, index) => (

                                        <Card
                                            className="blue-grey darken-1"
                                            textClassName="white-text"
                                            key={`result-card-${book.id}`}
                                            actions={
                                                [
                                                    <Button
                                                        key={`result-view-${book.id}`}
                                                    >
                                                        <a
                                                            href={book.volumeInfo.infoLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            View
                                                    </a>
                                                    </Button>,
                                                    <Button
                                                        key={`result-save-${book.id}`}
                                                        data-id={book.id}
                                                        data-title={book.volumeInfo.title}
                                                        data-author={book.volumeInfo.authors[0]}
                                                        data-imglink={book.volumeInfo.imageLinks.smallThumbnail ? book.volumeInfo.imageLinks.smallThumbnail : ''}
                                                        data-rating={book.volumeInfo.averageRating ? book.volumeInfo.averageRating : ''}
                                                        data-description={book.volumeInfo.description}
                                                        data-infolink={book.volumeInfo.infoLink}
                                                        data-bookindex={index}
                                                        onClick={this.saveBook}
                                                    >
                                                        Save
                                                </Button >
                                                ]
                                            }
                                        >
                                            <div className="row">
                                                <div className="col-md-3 text-center m-auto">
                                                    <img
                                                        className="mb-5"
                                                        src={book.volumeInfo.imageLinks.smallThumbnail}
                                                        alt="Book Thumbnail"
                                                    />
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
                            </Container>

                            : 'nothing'
                    }

                </Container>
            </>
        )
    };
};