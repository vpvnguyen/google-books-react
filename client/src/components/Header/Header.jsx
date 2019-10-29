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
                                <Link to="/" key={'/'}>
                                    <Button
                                        className={this.props.pageLoaded === '/' ? 'focused' : 'white-text'}
                                        tooltip="Go to Search Page"
                                        tooltipOptions={{ position: 'bottom' }}>
                                        Search For Books
                                        <Icon left>search</Icon>
                                    </Button>
                                </Link>,
                                <Link to="/saved" key={'/saved'}>
                                    <Button
                                        className={this.props.pageLoaded === '/saved' ? 'focused' : 'white-text'}
                                        tooltip="Go to Saved Books Page"
                                        tooltipOptions={{ position: 'bottom' }}>
                                        All Saved Books
                                        <Icon left>bookmark_border</Icon>
                                    </Button>
                                </Link>,
                                <a
                                    href="https://github.com/vpvnguyen/google-books-react"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={'github-link'}
                                >
                                    <Button
                                        className="grey-text"
                                        tooltip="Link to Github"
                                        tooltipOptions={{ position: 'bottom' }}>
                                        Github
                                        <Icon left>code</Icon>
                                    </Button>
                                </a>

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
