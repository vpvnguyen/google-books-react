import React, { Component } from 'react'

//material-ui
import { Card, Button } from 'react-materialize';

// api
import API from '../../utils/API.js';

export default class SavedPage extends Component {

    state = {
        savedBooks: []
    };

    componentDidMount() {
        this.loadSavedBooks();
    };

    loadSavedBooks = () => {
        API.getSavedBooks()
            .then(getSavedBooksResponse => {
                this.setState({ savedBooks: getSavedBooksResponse.data });
            })
            .catch(err => console.log(err));
    };

    deleteBookByID = event => {
        event.preventDefault();
        API.deleteBookByID(event.target.dataset.id)
            .then(deletedBookResponse => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <>
                {/* check if this.state.savedBooks has data */}
                {
                    this.state.savedBooks && this.state.savedBooks.length > 0 ?

                        <div className="row mt-5">
                            {/* map through array of objects and create card */}
                            {
                                this.state.savedBooks.map(book => (
                                    <Card className="container"
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
                                                    onClick={this.deleteBookByID}
                                                >
                                                    Delete
                                                </Button >

                                            ]
                                        }
                                    >
                                        <div className="row">
                                            <div className="col-md-3">
                                                <img src={book.imglink} alt="" className="imgclass" />
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

                        </div>

                        : 'nothing'
                }
            </>
        );
    };
};
