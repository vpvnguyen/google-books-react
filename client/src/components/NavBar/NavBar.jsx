import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';

export default class NavBar extends Component {

    render() {
        return (
            <Navbar
                brand={<a href='https://github.com/vpvnguyen/google-books-react' target='_blank' rel='noopener noreferrer'>Google Books</a>}
                centerLogo
                alignLinks='left'
            >
                <NavItem href='/'>
                    Search
                </NavItem>
                <NavItem href='/saved'>
                    Save
                </NavItem>
            </Navbar>
        );
    };
};
