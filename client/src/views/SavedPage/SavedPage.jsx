import React, { Component } from 'react';

//material-ui
import { Container } from 'react-materialize';
import { Card, Button } from 'react-materialize';

// components
import Preloader from '../../components/Preloader/Preloader.jsx';
// api
import API from '../../utils/API.js';

export default class SavedPage extends Component {

    state = {
        savedBooks: [],
        deleteBookIndex: -1,
        isLoading: true,
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        this.loadSavedBooks();
    };

    loadSavedBooks = () => {
        API.getSavedBooks()
            .then(getSavedBooksResponse => {
                this.setState({
                    savedBooks: getSavedBooksResponse.data,
                    isLoading: false
                });
            })
            .catch(err => console.log(err));
    };

    deleteBookByID = event => {
        event.preventDefault();

        this.setState({
            deleteBookIndex: event.target.dataset.deletebookindex,
            isLoading: true,
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
                    isLoading: false,
                });

            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Container>
                {/* render progress bar */}
                {this.state.isLoading ? <Preloader /> : ''}

                {/* check if this.state.savedBooks has data */}

                {
                    this.state.savedBooks && this.state.savedBooks.length > 0 ?

                        <Container className="mt-5">
                            {/* map through array of objects and create card */}
                            {
                                this.state.savedBooks.map((book, index) => (
                                    <Card
                                        className="blue-grey darken-1"
                                        textClassName="white-text"
                                        key={`saved-card-${book._id}`}

                                        // material-ui card action buttons
                                        actions={
                                            [
                                                <Button key={`saved-view-${book._id}`}>
                                                    <a href={book.infolink} target="_blank" rel="noopener noreferrer">
                                                        View
                                                    </a>
                                                </Button>,

                                                // delete book by id
                                                <Button
                                                    key={`saved-delete-${book._id}`}
                                                    data-id={book._id}
                                                    data-deletebookindex={index}
                                                    onClick={this.deleteBookByID}
                                                >
                                                    Delete
                                                </Button >

                                            ]
                                        }
                                    >
                                        <div className="row">
                                            <div className="col-md-3  text-center m-auto">
                                                <img
                                                    className="mb-5"
                                                    src={book.imglink} alt="Book Thumbnail" />
                                            </div>
                                            <div className="col-md-9">
                                                <h6>{book.title}</h6>
                                                <p>Author: {book.authors}</p>
                                                <p>Rating: {book.rating}</p>
                                                <p>Desc: {book.description}</p>
                                            </div>
                                        </div>
                                    </Card >
                                ))
                            }

                        </Container>

                        : 'nothing'
                }
            </Container>
        );
    };
};
