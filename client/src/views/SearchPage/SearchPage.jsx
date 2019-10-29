import React, { Component } from 'react';

// style
import { Container, Row, Col, TextInput, Button, Icon, Card } from 'react-materialize';
import { Animated } from 'react-animated-css';
import { toast } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';

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
    };

    // on load, set message
    componentDidMount() {
        this.setState({
            searchInput: '',
            isLoading: false,
            pageLoaded: '/',
            message: 'Search and save books',
            isCardVisible: true,
        });
    };

    // toast notifications
    toastId = null;
    notify = toastMessage => this.toastId = toast(toastMessage, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "blue-grey darken-4 toast-whitetext text-center"
    });

    // set user input
    handleChange = event => {
        this.setState({
            searchInput: event.target.value,
            isLoading: this.state.searchInput.length > 1 ? true : false,
        });
    };

    // validate google books search results; set placeholders if key does not exist
    validateResults = searchResults => {
        return searchResults.map(items => {
            items = {
                id: items.id,
                title: items.volumeInfo.title,
                author: items.volumeInfo.authors ? items.volumeInfo.authors : 'N/A',
                description: items.volumeInfo.description,
                imgLink: items.volumeInfo.imageLinks ? items.volumeInfo.imageLinks : { smallThumbnail: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081' },
                rating: items.volumeInfo.averageRating ? items.volumeInfo.averageRating : 'N/A',
                infoLink: items.volumeInfo.infoLink ? items.volumeInfo.infoLink : 'N/A',
            }
            return items;
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

        // check if search is empty
        if (searchInput === '') {
            this.setState({ isLoading: false });
            return this.notify('Try typing in a book!');
        }

        // get books from google api
        API.getBooks(searchInput)
            .then(res => {

                // validate results
                const validated = this.validateResults(res.data.items);

                this.setState({
                    searchResults: validated,
                    message: 'View or Save a book below!',
                    isLoading: false,
                });

            })
            .then(() => this.notify(`[${searchInput}] has been searched!`))
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

        // POST save book
        API.saveBook(saveBookData)
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

            })
            .then(() => {
                this.notify(`'${saveBookData.title}' has been saved!`);
                scroll.scrollToTop();
            });
    };

    render() {
        return (
            <>
                <Animated
                    animationIn="fadeInDown"
                    animationOut="fadeOut"
                    isVisible={this.state.isHeaderVisible}
                >
                    <Header
                        message={this.state.message}
                        isLoading={this.state.isLoading}
                        pageLoaded={this.state.pageLoaded}
                    />
                </Animated>

                {/* preloader display depending on load */}
                {this.state.isLoading ? <Preloader /> : null}

                <Container>

                    <Animated
                        animationIn="fadeInDownBig"
                        animationOut="fadeOut"
                        isVisible={this.state.isSearchVisible}
                    >
                        <form>
                            <Row>
                                <Col m={12} s={12}>

                                    {/* search box */}
                                    <Card
                                        actions={[
                                            <Animated
                                                animationIn="bounce"
                                                animationInDelay={1000}
                                                key={'search-box'}
                                            >
                                                <Button
                                                    type='submit'
                                                    waves='light'
                                                    tooltip="Search Book"
                                                    tooltipOptions={{ position: 'right' }}
                                                    onClick={this.getBooks}
                                                >
                                                    Submit
                                            <Icon right>send</Icon>
                                                </Button>
                                            </Animated>

                                        ]}
                                    >

                                        <Animated
                                            animationIn="fadeInLeft"
                                            animationInDelay={100}
                                        >
                                            {/* search field */}
                                            <TextInput
                                                label='Type a book here...'
                                                value={this.state.searchInput}
                                                onChange={this.handleChange}
                                            />
                                        </Animated>

                                    </Card>
                                </Col>
                            </Row>
                        </form>
                    </Animated>


                    {
                        this.state.searchResults.length > 0 ?

                            // map through array of objects and create cards for each book
                            this.state.searchResults.map((book, index) => (

                                <Animated
                                    animationIn="fadeInUp"
                                    animationOut="fadeOutLeftBig"
                                    animationOutDuration={5000}
                                    isVisible={this.state.isCardVisible}
                                    key={`result-animate-${book.id}`}
                                >
                                    <Card
                                        className="blue-grey darken-3"
                                        textClassName="white-text"
                                        key={`result-card-${book.id}`}
                                        actions={
                                            [
                                                <a
                                                    key={`view-link-${book.id}`}
                                                    className="view-button"
                                                    href={book.infoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {/* link to google books */}
                                                    <Button
                                                        key={`result-view-${book.id}`}
                                                        className="view-text"
                                                        tooltip="Link to Book"
                                                        tooltipOptions={{ position: 'top' }}
                                                    >
                                                        View
                                                        <Icon key={`icon-view-${book.id}`} left>find_in_page</Icon>

                                                    </Button>
                                                </a>
                                                ,

                                                // pass dataset to API model; save book by ID
                                                <Button
                                                    key={`result-save-${book.id}`}
                                                    className="save-text"
                                                    data-id={book.id}
                                                    data-title={book.title}
                                                    data-author={book.author}
                                                    data-imglink={book.imgLink.smallThumbnail}
                                                    data-rating={book.rating}
                                                    data-description={book.description}
                                                    data-infolink={book.infoLink}
                                                    data-bookindex={index}
                                                    tooltip={`Save book: [${book.title}]!`}
                                                    tooltipOptions={{ position: 'top' }}
                                                    onClick={this.saveBook}
                                                >
                                                    Save
                                                    <Icon key={`icon-save-${book.id}`} left>save</Icon>
                                                </Button >
                                            ]
                                        }
                                    >
                                        {/* display book info */}
                                        <div className="row">
                                            <div className="col-md-3 text-center m-auto">
                                                <img
                                                    className="book-image mb-5"
                                                    src={book.imgLink.smallThumbnail}
                                                    alt="Book Thumbnail"
                                                />
                                            </div>
                                            <div className="col-md-9">
                                                <Card
                                                    className="blue-grey darken-1"
                                                    textClassName="white-text"
                                                    key={`saved-card-header-${book.id}`}
                                                >
                                                    <h6 className="sandybrown-text text-center">{book.title}</h6>
                                                    <hr />
                                                    <p className="text-center">Author: {book.author}</p>
                                                    <p className="text-center">Rating: {book.rating}</p>
                                                </Card>

                                                <Card
                                                    className="blue-grey darken-1"
                                                    textClassName="white-text"
                                                    key={`saved-card-info-${book.id}`}
                                                >
                                                    {book.description}
                                                </Card>


                                            </div>
                                        </div>
                                    </Card >
                                </Animated>
                            ))

                            :

                            <Animated
                                animationIn="fadeInDown"
                                animationOut="zoomOutUp"
                                animationInDelay={2000}
                                isVisible={this.state.isCardVisible}
                            >

                                {/* change message depending on state of text area */}
                                <Card
                                    className="blue-grey darken-4"
                                >
                                    <Animated
                                        className="white-text"
                                        animationIn="fadeInUp"
                                        animationInDelay={2200}
                                        animationOut="flash"
                                        animationOutDelay={500}
                                        isVisible={this.state.searchInput.length > 0 ? false : true}
                                    >
                                        {this.state.searchInput.length > 0 ? 'Press SUBMIT when ready' : 'No search results to display. Try searching for a book!'}
                                    </Animated>
                                </Card>

                            </Animated>

                    }

                </Container>
            </>
        );
    };
};
