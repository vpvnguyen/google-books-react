import React, { Component } from 'react';
import { Container, Col, Card } from 'react-materialize';
import ActionSidebar from '../ActionSidebar/ActionSidebar.jsx';

export default class Header extends Component {

    render() {
        return (
            <Container>
                <Col m={12} s={12}>
                    <Card
                        className="blue-grey darken-1"
                        textClassName="white-text"
                        title="Google Books Search"
                        actions={[<ActionSidebar />]}
                    >
                        {this.props.message}
                    </Card>
                </Col>
            </Container>
        )
    };
};
