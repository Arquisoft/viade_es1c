import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar.css";
import LoggedIn from "@solid/react/module/components/LoggedIn";
import {useTranslation} from "react-i18next";
import {LogoutButton} from "@solid/react";
import ReactTooltip from 'react-tooltip'


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
                        <a data-tip={t('navBar.maps')} className="navbar-link a-bar" href="#/visualize">
                            <img src={process.env.PUBLIC_URL + "/img/icon/maps-icon.png"} width="40" height="40" alt="My tracks"/>
                        </a>
						 <a data-tip={t('navBar.share-files')} className="navbar-link a-bar" href="#/share">
                            <img src={process.env.PUBLIC_URL + "/img/icon/share-files.svg"} width="27" height="49" alt="Share files"/>
                        </a>
                        <a data-tip={t('navBar.upload')} className="navbar-link a-bar" href="#/upload">
                            <img src={process.env.PUBLIC_URL + "/img/icon/upload-icon.png"} width="40" height="40" alt="Upload track"/>
                        </a>
                        <a data-tip={t('navBar.download')} className="navbar-link a-bar a-download" href="#/download">
                            <img src={process.env.PUBLIC_URL + "/img/icon/download-icon.svg"} width="31" height="25" alt="Download track"/>
                        </a>
                        <LogoutButton className="logout btn btn-light">{t("logout.button")}</LogoutButton>
						<ReactTooltip place="bottom" type="dark" effect="solid"/>
					</Nav>
                </Navbar>
            </LoggedIn>
        </section>
    );
}

export default MyNavBar;
