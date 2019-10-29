import React, { Component } from 'react';

// style
import { Container, ProgressBar } from 'react-materialize';
import './Preloader.css';

export default class Preloader extends Component {

    render() {
        return (
            <Container >
                <ProgressBar className='preloader-bar' />
            </Container >
        );
    };
};
