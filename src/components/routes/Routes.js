import React from 'react'
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import VisualizeTrack from '../containers/visualizeTracks/VisualizeTrack'

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