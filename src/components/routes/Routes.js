import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import VisualizeTrack from "../containers/visualizeTracks/VisualizeTrack";
import UploadTrack from "../containers/uploadTracks/UploadTrack";
import MyNavBar from "../navBar/NavBar";
import ShareTrack from "../containers/shareTracks/ShareTrack";
import DownloadTrack from "../containers/downloadTracks/DownloadTrack";
import Welcome from "../containers/welcome/Welcome";
import Login from "../containers/login/Login";
import VisualizeNotifications from "../containers/visualizeNotifications/VisualizeNotifications";
import { LoggedIn, LoggedOut } from "@solid/react";
import Friends from "../containers/friends/Friends";

/**
 * It is in charge of the different routes of the application
 * and of verifying that access is allowed to certain areas of the application
 * @returns {*}
 * @constructor
 */
export default function Routes() {
    return (
        <HashRouter>
                <LoggedIn>
                    <MyNavBar/>
                    <Switch>
                        <Route exact path="/" component={Welcome}/>
                        <Route exact path="/welcome" component={Welcome}/>
                        <Route exact path="/visualize" component={VisualizeTrack}/>
                        <Route exact path="/upload" component={UploadTrack}/>
                        <Route exact path="/share" component={ShareTrack}/>
                        <Route exact path="/friends" component={Friends}/>
                        <Route exact path="/download" component={DownloadTrack}/>
                        <Route exact path="/notifications" component={VisualizeNotifications}/>
                        <Redirect to="/"></Redirect>
                    </Switch>
                </LoggedIn>
                <LoggedOut>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/login" component={Login}/>
                        <Redirect to="/"></Redirect>
                    </Switch>
                </LoggedOut>
        </HashRouter>
    );
}