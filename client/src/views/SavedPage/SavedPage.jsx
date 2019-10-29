import React, { Component } from 'react';

//material-ui
import { Container } from 'react-materialize';
import { Card, Button, Icon } from 'react-materialize';
import { Animated } from 'react-animated-css';

// react-scroll
import { animateScroll as scroll } from 'react-scroll';

// toast
import { toast } from 'react-toastify';

// components
import Preloader from '../../components/Preloader/Preloader.jsx';
import Header from '../../components/Header/Header.jsx';

// api
import API from '../../utils/API.js';

export default class SavedPage extends Component {

    state = {
        pageLoaded: '/saved',
        savedBooks: [],
        deleteBookIndex: -1,
        deleteBookTitle: '',
        isSavedPageLoading: false,
        message: '',
        isCardVisible: true,
        isHeaderVisible: true,
    };

    // toast notifications
    toastId = null;
    notify = (toastMessage) => this.toastId = toast(toastMessage, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "blue-grey darken-4 toast-whitetext text-center"
    });

    // on load, get saved books from mongodb
    componentDidMount() {
        this.setState({
            isSavedPageLoading: true,
            isHeaderVisible: true,
            isCardVisible: true,
            message: '',
        });

        this.loadSavedBooks();
    };

    // GET saved books
    loadSavedBooks = () => {
        API.getSavedBooks()
            .then(getSavedBooksResponse => {
                this.setState({
                    savedBooks: getSavedBooksResponse.data,
                    isSavedPageLoading: false,
                    message: 'All saved books...',
                });
            })
            .catch(err => console.log(err));
    };

    // DELETE saved book by ID
    deleteBookByID = event => {
        event.preventDefault();

        this.setState({
            deleteBookIndex: event.target.dataset.deletebookindex,
            deleteBookTitle: event.target.dataset.title,
            isSavedPageLoading: true,
            isCardVisible: false,
        });

        API.deleteBookByID(event.target.dataset.id)
            .then(() => {

                // loop saved books, return new array without deleted book
                const newSavedBooks = [];

                this.state.savedBooks.forEach((value, index) => {
                    if (index !== Number(this.state.deleteBookIndex)) {
                        newSavedBooks.push(value);
                    }
                });

                this.setState({
                    savedBooks: newSavedBooks,
                    isSavedPageLoading: false,
                    isCardVisible: true,
                });

                this.notify(`[${this.state.deleteBookTitle}] has been deleted...`);
                scroll.scrollToTop();

            })
            .catch(err => console.log(err));
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
                        isSavedPageLoading={this.state.isSavedPageLoading}
                        pageLoaded={this.state.pageLoaded}
                    />
                </Animated>

                {/* show preloader depending on action */}
                {this.state.isSavedPageLoading ? <Preloader /> : null}

                <Container>

                    {/* check if this.state.savedBooks has data, render to dom */}

                    {this.state.savedBooks.length !== 0 ?

                        <div>
                            {/* map through array of objects and create card */}
                            <Animated
                                animationIn="fadeInRightBig"
                                animationOut="zoomOut"
                                animationOutDuration={4000}
                                isVisible={this.state.isCardVisible}
                            >

                                {this.state.savedBooks.map((book, index) => (

                                    <Card
                                        className="blue-grey darken-3"
                                        textClassName="white-text"
                                        key={`saved-card-${book._id}`}

                                        // material-ui card action buttons
                                        actions={
                                            [
                                                <a
                                                    key={`view-link-${book._id}`}
                                                    href={book.infolink}
                                                    target="_blank"
                                                    rel="noopener noreferrer">
                                                    <Button
                                                        key={`saved-view-${book._id}`}
                                                        className="view-text"
                                                        tooltip="Link to Book"
                                                        tooltipOptions={{ position: 'top' }}>
                                                        <Icon key={`icon-view-${book.id}`} left>find_in_page</Icon>
                                                        View
                                                            </Button>
                                                </a>

                                                ,

                                                // delete book by id
                                                <Button
                                                    key={`saved-delete-${book._id}`}
                                                    className="delete-text"
                                                    data-id={book._id}
                                                    data-title={book.title}
                                                    data-deletebookindex={index}
                                                    tooltip="Delete Book"
                                                    tooltipOptions={{ position: 'top' }}
                                                    onClick={this.deleteBookByID}
                                                >
                                                    <Icon key={`icon-delete-${book._id}`} left>delete</Icon>
                                                    Delete
                                                        </Button >

                                            ]
                                        }
                                    >
                                        {/* display content information */}
                                        <div className="row">
                                            <div className="col-md-3 text-center m-auto">
                                                <img
                                                    className="book-image mb-5"
                                                    src={book.imglink}
                                                    alt="Book Thumbnail"
                                                />
                                            </div>
                                            <div className="col-md-9">
                                                <Card
                                                    className="blue-grey darken-1"
                                                    textClassName="white-text"
                                                    key={`saved-card-header-${book._id}`}
                                                >
                                                    <h6 className="sandybrown-text text-center">{book.title}</h6>
                                                    <hr className="m-4" />
                                                    <p>Author: {book.author}</p>
                                                    <p>Rating: {book.rating}</p>
                                                </Card>

                                                <Card
                                                    className="blue-grey darken-1"
                                                    textClassName="white-text"
                                                    key={`saved-card-info-${book._id}`}
                                                >
                                                    {book.description}
                                                </Card>

                                            </div>
                                        </div>
                                    </Card >

                                ))}
                            </Animated>

                        </div>

                        :

                        // if there are no data in array, render this component
                        <Animated animationIn="zoomIn" >
                            <Card className="black-text">
                                There appears to be nothing here... Search for one!
                                </Card>
                        </Animated>
                    }

                </Container>
            </>
        );
    };
};
