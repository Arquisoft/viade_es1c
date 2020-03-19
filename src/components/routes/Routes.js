import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import VisualizeTrack from '../containers/visualizeTracks/VisualizeTrack';
import UploadTrack from "../containers/uploadTracks/UploadTrack";
import MyNavBar from "../containers/navBar/NavBar";
import ShareTrack from "../containers/shareTracks/ShareTrack";
import DownloadTrack from "../containers/downloadTracks/DownloadTrack";
import Welcome from "../containers/welcome/Welcome";

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
                    <Route exact path="/">
                        <Welcome/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}