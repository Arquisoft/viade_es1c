import React from "react";
import { Navbar, Nav, DropdownButton, DropdownItem } from "react-bootstrap";
import "./Navbar.css";
import LoggedIn from "@solid/react/module/components/LoggedIn";
import {useTranslation} from "react-i18next";
import {LogoutButton} from "@solid/react";
import i18n from 'i18next';

const MyNavBar = props => {

    const {t} = useTranslation();
    return (
        <section>
            <LoggedIn>
                <Navbar className="nav-color">
                    <a className="navbar-brand a-bar a-logo" href="#/">
                        <img src={process.env.PUBLIC_URL + "/img/logoViaDe.svg"} width="100" height="45" alt="ViaDe icon"/>
                    </a>
                    <Nav className="mr-auto">
                        <a className="navbar-link a-bar" href="#/visualize">
                            <img src={process.env.PUBLIC_URL + "/img/icon/maps-icon.png"} width="40" height="40" alt="My tracks"/>
                        </a>
                        <a className="navbar-link a-bar" href="#/share">
                            <img src={process.env.PUBLIC_URL + "/img/icon/share-files.svg"} width="27" height="49" alt="Share files"/>
                        </a>
                        <a className="navbar-link a-bar" href="#/upload">
                            <img src={process.env.PUBLIC_URL + "/img/icon/upload-icon.png"} width="40" height="40" alt="Upload track"/>
                        </a>
                        <a className="navbar-link a-bar a-download" href="#/download">
                            <img src={process.env.PUBLIC_URL + "/img/icon/download-icon.svg"} width="31" height="25" alt="Download track"/>
                        </a>
                        <div className="i18nMenu">
                            <DropdownButton className="i18nMenu" variant="light" title={t("nav.language")}>
                                <DropdownItem>
                                    <div onClick={() => i18n.changeLanguage("en")}> ENG </div>
                                </DropdownItem>
                                <DropdownItem>
                                    <div onClick={() => i18n.changeLanguage("es")}> ESP </div>
                                </DropdownItem>
                            </DropdownButton>
                        </div>
                        <LogoutButton className="logout btn btn-light">{t("logout.button")}</LogoutButton>
                    </Nav>
                </Navbar>
            </LoggedIn>
        </section>
    );
}

export default MyNavBar;
