import React, { Component } from 'react'

// material ui
import { SideNav, SideNavItem, Button } from 'react-materialize';

export default class ActionSidebar extends Component {
    render() {
        return (
            <div className="container">
                <SideNav trigger={<Button>Navigation</Button>} options={{ closeOnClick: true }}>
                    <SideNavItem icon="cloud" subheader>
                        Awesome Sidebar
</SideNavItem>
                    <SideNavItem subheader>
                        What would you like to do?
</SideNavItem>
                    <SideNavItem divider />
                    <SideNavItem href="/">
                        Home
</SideNavItem>
                    <SideNavItem waves href="/saved">
                        Saved Books
</SideNavItem>
                </SideNav>
            </div>
        )
    }
}
