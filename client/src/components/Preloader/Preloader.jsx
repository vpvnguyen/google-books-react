import React, { Component } from 'react';

// material ui
import { Row, Col, ProgressBar } from 'react-materialize';

// style
import './Preloader.css';

export default class Preloader extends Component {
    render() {
        return (
            <Row>
                <Col s={12}>
                    <ProgressBar className="preloader-bar" />
                </Col>
            </Row>
        );
    };
};
