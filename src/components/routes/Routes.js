import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import VisualizeTrack from '../containers/visualizeTracks/VisualizeTrack';
import UploadTrack from "../containers/uploadTracks/UploadTrack";
import MyNavBar from "../navBar/NavBar";
import ShareTrack from "../containers/shareTracks/ShareTrack";
import DownloadTrack from "../containers/downloadTracks/DownloadTrack";
import Welcome from "../containers/welcome/Welcome";
import Login from "../containers/login/Login";

export default function Routes(props) {
    return (
        <Router>
            <div>
                <MyNavBar/>
                <Switch>
                    <Route path="/visualize">
                        <VisualizeTrack />
                    </Route>
                    <Route path="/upload">
                        <UploadTrack />
                    </Route>
                    <Route path="/share">
                        <ShareTrack />
                    </Route>
                    <Route path="/download">
                        <DownloadTrack />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/welcome">
                        <Welcome />
                    </Route>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
}