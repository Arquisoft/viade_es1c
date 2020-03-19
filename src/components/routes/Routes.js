import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import VisualizeTrack from '../containers/visualizeTracks/VisualizeTrack';
import UploadTrack from "../containers/uploadTracks/UploadTrack";
import MyNavBar from "../containers/navBar/NavBar";
import ShareTrack from "../containers/shareTracks/ShareTrack";

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
                </Switch>
            </div>
        </Router>
    );
}