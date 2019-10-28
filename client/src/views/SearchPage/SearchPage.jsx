import React, { Component } from 'react';

// style
import './SearchPage.css';

// material ui
import { Container, Row, Col, TextInput, Button, Icon, Card } from 'react-materialize';

// toast
import { toast } from 'react-toastify';

// animate
import { Animated } from 'react-animated-css';

// components
import Header from '../../components/Header/Header.jsx';
import Preloader from '../../components/Preloader/Preloader.jsx';

// api
import API from '../../utils/API.js';

export default class SearchPage extends Component {

    state = {
        pageLoaded: '/',
        searchInput: '',
        searchResults: [],
        isSearched: false,
        savedBookIndex: -1,
        isLoading: true,
        message: '',
        isHeaderVisible: true,
        isSearchVisible: true,
        isCardVisible: true,
        isTyping: '',
    };

    // on load, set message
    componentDidMount() {
        this.setState({
            isLoading: false,
            pageLoaded: '/',
            message: 'Search and save books',
            isCardVisible: true,

        });
    };

    // toast notifications
    toastId = null;
    notify = (toastMessage) => this.toastId = toast(toastMessage, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "blue-grey darken-4 toast-whitetext text-center"
    });

    // set user input
    handleChange = event => {
        this.setState({
            searchInput: event.target.value,
        });

    };

    // get google books api
    getBooks = event => {
        event.preventDefault();

        this.setState({
            searchResults: [],
            isloading: true
        });

        const searchInput = this.state.searchInput.trim();

        if (searchInput === '') {
            this.notify('Try typing in a book!');
        }

        // get books from google api
        API.getBooks(searchInput)
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
            isCardVisible: false,
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
                    isLoading: false,
                    isCardVisible: true,
                });

            });
    };

    render() {
        return (
            <>

                <Animated
                    animationIn="fadeInDown"
                    animationOut="fadeOut"
                    isVisible={this.state.isHeaderVisible}>

                    <Header
                        message={this.state.message}
                        isLoading={this.state.isLoading}
                        pageLoaded={this.state.pageLoaded} />

                    {this.state.isLoading ? <Preloader /> : null}

                </Animated>

                <Container>

                    <Animated
                        animationIn="fadeInDownBig"
                        animationOut="fadeOut"
                        isVisible={this.state.isSearchVisible}>
                        <form>
                            <Row>
                                <Col m={12} s={12}>
                                    <Card
                                        actions={[
                                            <Animated
                                                animationIn="bounce" animationInDelay="1000">

                                                <Button
                                                    type='submit'
                                                    waves='light'
                                                    onClick={this.getBooks}
                                                >
                                                    Submit
                                            <Icon right>send</Icon>
                                                </Button>
                                            </Animated>

                                        ]}>
                                        <Animated animationIn="fadeInLeft" animationInDelay="100">

                                            <TextInput
                                                label='Type a book here...'
                                                value={this.state.searchInput}
                                                onChange={this.handleChange} />
                                        </Animated>

                                    </Card>
                                </Col>
                            </Row>
                        </form>
                    </Animated>


                    {
                        this.state.searchResults && this.state.searchResults.length > 0 ?

                            <Container className="mt-5">
                                {/* map through array of objects and create card */}
                                <Animated animationIn="fadeInLeftBig" animationOut="fadeOutLeftBig" animationOutDelay="5000" isVisible={this.state.isCardVisible}>

                                    {
                                        this.state.searchResults.map((book, index) => (
                                            <Card
                                                className="blue-grey darken-2"
                                                textClassName="white-text"
                                                key={`result-card-${book.id}`}
                                                actions={
                                                    [
                                                        <a
                                                            key={`view-link-${book.id}`}
                                                            className="view-button"
                                                            href={book.volumeInfo.infoLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Button
                                                                key={`result-view-${book.id}`}
                                                                className="view-text"
                                                            >
                                                                View
                                                                <Icon key={`icon-view-${book.id}`} left>find_in_page</Icon>

                                                            </Button>
                                                        </a>
                                                        ,
                                                        <Button
                                                            key={`result-save-${book.id}`}
                                                            className="save-text"
                                                            data-id={book.id}
                                                            data-title={book.volumeInfo.title}
                                                            data-author={book.volumeInfo.authors[index] > 0 ? book.volumeInfo.authors[0] : 'none'}
                                                            data-imglink={book.volumeInfo.imageLinks.smallThumbnail !== undefined ? book.volumeInfo.imageLinks.smallThumbnail : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081'}
                                                            data-rating={book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'No rating'}
                                                            data-description={book.volumeInfo.description}
                                                            data-infolink={book.volumeInfo.infoLink}
                                                            data-bookindex={index}
                                                            onClick={this.saveBook}
                                                        >
                                                            Save
                                                            <Icon key={`icon-save-${book.id}`} left>save</Icon>
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
                                                        <h6 className="p-2 sandybrown-text text-center">{book.volumeInfo.title}</h6>
                                                        <p className="text-center">Author: {book.volumeInfo.authors[0]}</p>
                                                        <p className="mb-4 text-center">Rating: {book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'N/A'}</p>
                                                        {book.volumeInfo.description ? <p>{book.volumeInfo.description}</p> : <p className="grey-text">No summary available</p>}
                                                    </div>
                                                </div>
                                            </Card >
                                        ))
                                    }
                                </Animated>

                            </Container>

                            :

                            <Animated animationIn="fadeInDown" animationOut="zoomOutUp" animationInDelay="1800">

                                <Card >
                                    <Animated

                                        className="black-text"
                                        animationIn="fadeInLeft"
                                        animationInDelay="1400"
                                        animationOut="flash"
                                        animationOutDelay="500"
                                        isVisible={this.state.searchInput.length > 0 ? false : true}>
                                        {this.state.searchInput.length > 0 ?
                                            'Press SUBMIT when ready' :
                                            'No search results to display. Try searching for a book!'}
                                    </Animated>
                                </Card>

                            </Animated>
                    }

                </Container>
            </>
        )
    };
};