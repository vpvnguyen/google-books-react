import React, { Component } from 'react';

// material ui
import { Container, Col, Card } from 'react-materialize';

// style
import { toast } from 'react-toastify';

// components
import ActionSidebar from '../ActionSidebar/ActionSidebar.jsx';


export default class Header extends Component {
    toastId = null;
    notifyHelp = () => this.toastId = toast.info('Need some help?', { position: toast.POSITION.TOP_RIGHT })

    render() {
        return (
            <Container>
                <Col m={12} s={12}>

                    <Card
                        className="blue-grey darken-1"
                        textClassName="white-text"
                        title="Google Books Search"
                        actions={[<ActionSidebar onClick={this.notifyHelp} />]}
                    >
                        {this.props.message}
                    </Card>

                </Col>
            </Container>
        );
    };
};
