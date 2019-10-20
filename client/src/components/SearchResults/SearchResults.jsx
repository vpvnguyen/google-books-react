import React, { Component } from 'react';

// material-ui
import { Card, Button } from 'react-materialize';

// style
import './SearchResults.css';

export default class SearchResults extends Component {
    render() {
        return (

            <div className="row mt-5">
                {/* map through array of objects and create card */}
                {
                    this.props.searchResults.map(book => (

                        // if wrapped in a container, will lose cascading card style
                        <Card className="container"
                            key={book.id}
                            actions={
                                [
                                    <Button ><a href={book.volumeInfo.infoLink} target="_blank">View</a></Button>,
                                    <Button>Save</Button>

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

        )
    }
}
