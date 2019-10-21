import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

export default class Header extends Component {

    render() {
        return (
            <Jumbotron>
                <h1>Google Books Search!</h1>
                <p>
                    Search and save your favorite books!
                </p>
            </Jumbotron>
        )
    };
};
