import React from 'react'
import { Navbar, NavItem } from 'react-materialize';

export default function NavBar() {
    return (
        <div>
            <Navbar brand={<a />} centerLogo alignLinks="left">
                <NavItem >
                    Search
                </NavItem>
                <NavItem divider />
                <NavItem href="#">
                    Save
                </NavItem>
            </Navbar>
        </div>
    )
}
