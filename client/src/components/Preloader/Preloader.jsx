import React, { Component } from 'react';

// material ui
import { Container, ProgressBar } from 'react-materialize';

// style
import './Preloader.css';

export default class Preloader extends Component {

    render() {
        return (
            <Container>
                <ProgressBar className="preloader-bar" />
            </Container>
        );
    };
};
