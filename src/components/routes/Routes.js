import React from 'react';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import VisualizeTrack from '../containers/visualizeTracks/VisualizeTrack';
import UploadTrack from "../containers/uploadTracks/UploadTrack";
import MyNavBar from "../navBar/NavBar";
import ShareTrack from "../containers/shareTracks/ShareTrack";
import DownloadTrack from "../containers/downloadTracks/DownloadTrack";
import Welcome from "../containers/welcome/Welcome";
import Login from "../containers/login/Login";

export default function Routes() {
    return (
        <HashRouter>
                <MyNavBar/>
                <Switch>
                    <Route exact path="/welcome" component={Welcome}/>
                    <Route exact path="/visualize" component={VisualizeTrack}/>
                    <Route exact path="/upload" component={UploadTrack}/>
                    <Route exact path="/share" component={ShareTrack}/>
                    <Route exact path="/download" component={DownloadTrack}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/" component={Login}/>
                    <Redirect to="/"></Redirect>
                </Switch>
        </HashRouter>
    );
}