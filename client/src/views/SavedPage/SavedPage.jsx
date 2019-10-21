import React, { Component } from 'react'

//material-ui
import { Card, Button } from 'react-materialize';

// api
import API from '../../utils/API.js';

export default class SavedPage extends Component {
    state = {
        books: []
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.getSavedBooks()
            .then(res => {
                this.setState({ books: res.data });
                console.log('LOADED BOOKS')
                console.log(this.state.books);
            })
            .catch(err => console.log(err));
    };

    deleteBookByID = (e) => {
        e.preventDefault();
        console.log(e.target.dataset.id);
    }

    render() {
        return (
            <>
                {
                    this.state.books && this.state.books.length > 0 ?

                        <div className="row mt-5">
                            {/* map through array of objects and create card */}
                            {
                                this.state.books.map(book => (
                                    <form>
                                        <Card className="container"
                                            key={book._id}
                                            actions={
                                                [
                                                    <Button key={book._id}><a href={book.infolink} target="_blank" rel="noopener noreferrer">View</a></Button>,
                                                    <Button
                                                        key={book._id}
                                                        data-id={book._id}
                                                        onClick={this.deleteBookByID}
                                                    > Delete</Button >

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
                                    </form>

                                ))
                            }
                        </div>

                        : 'nothing'
                }
            </>
        )
    }
}
