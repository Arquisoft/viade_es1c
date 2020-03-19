import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar.css";
import LoggedIn from "@solid/react/module/components/LoggedIn";

const MyNavBar = props => {
    return (
        <section>
            <LoggedIn>
                <Navbar bg="primary" variant="dark">
                    <a className="navbar-brand a-bar" href="/">
                        <img src="/img/logoViaDe.svg" width="100" height="40" alt="ViaDe icon"/>
                    </a>
                    <Nav className="mr-auto">
                        <a className="navbar-link a-bar" href="/visualize">
                            <img src="/img/icon/maps-icon.png" width="40" height="40" alt="My tracks"/>
                        </a>
                        <a className="navbar-link a-bar" href="/share">
                            <img src="/img/icon/share-files.svg" width="25" height="50" alt="Share files"/>
                        </a>
                        <a className="navbar-link a-bar" href="/upload">
                            <img src="/img/icon/upload-icon.png" width="40" height="40" alt="Upload track"/>
                        </a>
                        <a className="navbar-link a-bar" href="/download">
                            <img src="/img/icon/download-icon.png" width="31" height="32" alt="Upload track"/>
                        </a>
                    </Nav>
                </Navbar>
            </LoggedIn>
        </section>
    );
}

export default MyNavBar;
