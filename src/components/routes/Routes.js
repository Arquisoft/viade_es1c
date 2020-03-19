import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import VisualizeTrack from '../containers/visualizeTracks/VisualizeTrack';
import UploadTrack from "../containers/uploadTracks/UploadTrack";
import MyNavBar from "../containers/navBar/NavBar";

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
                </Switch>
            </div>
        </Router>
    );
}