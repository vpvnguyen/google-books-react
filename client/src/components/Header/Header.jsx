import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// style
import './Header.css';

// material ui
import { Container, Row, Col, Card, Button, Icon } from 'react-materialize';
import { toast } from 'react-toastify';
export default class Header extends Component {

    toastId = null;
    notifyHelp = () => this.toastId = toast.info('Need some help?', { position: toast.POSITION.TOP_RIGHT })

    render() {

        return (
            <Container>
                <Row>
                    <Col m={12} s={12}>

                        <Card
                            className="blue-grey darken-4"
                            textClassName="white-text"
                            title="Google Books Search"
                            actions={[
                                <Link to="/">
                                    <Button
                                        className={this.props.pageLoaded === '/' ? 'focused' : 'white-text'}>
                                        Search For Books
                                        <Icon left>search</Icon>
                                    </Button>
                                </Link>,
                                <Link to="/saved">
                                    <Button
                                        className={this.props.pageLoaded === '/saved' ? 'focused' : 'white-text'}>
                                        All Saved Books
                                        <Icon left>bookmark_border</Icon>
                                    </Button>
                                </Link>
                            ]}
                        >
                            {this.props.message}

                        </Card>

                    </Col>
                </Row>
            </Container>
        );
    };
};
