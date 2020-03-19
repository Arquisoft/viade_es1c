import React from 'react'
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import VisualizeTrack from '../containers/visualizeTracks/VisualizeTrack';
import UploadTrack from "../containers/uploadTracks/UploadTrack";

export default function Routes(props) {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/tracks/visualize" render={() => <VisualizeTrack {...props} />}></Route>
                <Route exact path="/" render={props => <VisualizeTrack {...props} />}></Route>
                <Redirect to="/404" />
            </Switch>
        </HashRouter>
    )
}