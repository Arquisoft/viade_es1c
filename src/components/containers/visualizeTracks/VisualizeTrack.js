import React, {useState} from "react";
import {Marker, Popup, TileLayer, Polyline, Map} from "react-leaflet";
import { VictoryArea, VictoryChart, VictoryTheme, VictoryStack } from 'victory';
import {LoggedIn, LoggedOut} from "@solid/react";
import {Button, Col, Row, Container} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import L from 'leaflet';
import FC from 'solid-file-client';
import {Select} from '../../utils/select/Select';
import {NotificationContainer, NotificationManager} from "react-notifications";
import { Redirect } from "react-router-dom";
// CSS imports
import 'leaflet/dist/leaflet.css';
import "./VisualizeTrack.css";
import 'react-notifications/lib/notifications.css';

// Marker's icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

/**
 * Component used to display routes on a map
 */
export const VisualizeTrack = (props) => {

    // Locales for i18n
    const {t} = useTranslation();

    // Hooks for polyline and map
    const zoomValue = 11;
    const [zoom, setZoom] = useState(0);
    const [positions, setPositions] = useState(0);
    const [center, setCenter] = useState(0);
    const [origin, setOrigin] = useState(0);
    const [target, setTarget] = useState(0);
    const [data, setData] = useState([]);
    const [elevation, setElevation] = useState([]);
    const [showChart, setShowChart] = useState(false);

    /**
     * This function is invoked when the user selects a route in the combobox. It's function
     * is to show on the map the selected route. To do so:
     *  1. We obtain the user's webID
     *  2. We search in the user's pod for the specified route
     *  3. We display the new route on the map
     *
     * @param event
     */
    function handleSelect(event) {
        const auth = require('solid-auth-client');
        auth.trackSession(session => {
            if (!session) {
                return;
            } else {
                /*
                  The webId has the structure: https://uo265308.solid.community/profile/card#me
                  We want the structure: https://uo265308.solid.community/public/MyRoutes/

                  15 == length("profile/card#me")
                */
                let webId = session.webId;
                let urlRouteInPod = webId.slice(0, webId.length - 15).concat("public/MyRoutes/");

                event.preventDefault();

                // We obtain the name of the route from the combobox and build the final URL
                let selectedRouteName = document.getElementById("selectRoute").value.concat(".json");
                urlRouteInPod = urlRouteInPod.concat(selectedRouteName);

                const fc = new FC(auth);
                fc.readFile(urlRouteInPod, null).then((content) => {

                    // We obtain the JSON file from the pod
                    let route = JSON.parse(content);

                    // We obtain the points of the route
                    let points = [];
                    let elevationsValues = [];
                    for (let i = 0; i < route.itinerary.numberOfItems; i++) {
                        let latitude = route.itinerary.itemListElement[i].item.latitude;
                        let longitude = route.itinerary.itemListElement[i].item.longitude;
                        let elevationValue = route.itinerary.itemListElement[i].item.elevation.split(" ");
                        elevationsValues.push({ x: 'P'.concat(i+1), y: parseInt(elevationValue[0], 10)});
                        points.push([latitude, longitude]);
                    }
                    // We show the points of the route in the map
                    setOrigin(points[0]);
                    setTarget(points[points.length - 1]);
                    setCenter(points[0]);
                    setPositions(points);
                    setZoom(zoomValue);
                    setElevation(elevationsValues);
                    setShowChart(true);
                })
                    .catch(err => NotificationManager.error(t('routes.errorMessage'), t('routes.errorTitle'), 3000))
            }
        })
    }

    /**
     * Load the select component with tracks
     * @param event
     */

    function handleLoad(event) {
        const auth = require('solid-auth-client');
        auth.trackSession(session => {
            if (!session) {
                return;
            } else {
                /*
                  The webId has the structure: https://uo265308.solid.community/profile/card#me
                  We want the structure: https://uo265308.solid.community/public/MyRoutes/

                  15 == length("profile/card#me")
                */
                var webId = session.webId;
                var urlRouteInPod = webId.slice(0, webId.length - 15).concat("public/MyRoutes/");

                event.preventDefault();

                const fc = new FC(auth);
                let routes = [];
                fc.readFolder(urlRouteInPod, null).then((content) => {
                    if (content.files.length === 0) {
                        NotificationManager.warning(t('routes.loadWarningMessage'), t('routes.loadWarningTitle'), 3000)
                    } else {
                        for (let i = 0; i < content.files.length; i++) {
                            routes.push(content.files[i].name.slice(0, content.files[i].name.length - 5));
                        }
                    }
                    // Hook for select
                    setData(routes);
                })
                    .catch(err => console.error("Error:" + err))
            }
        })
    }

    return (
        <section>
            <LoggedIn>
                <Container>
                    <Row>
                        <h1 className="myH1">{t('routes.title')}</h1>
                    </Row>
                    <Row>
                        <Col sm={10}>
                            <Row>
                                <Map className="map" center={center} zoom={zoom}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                    <Polyline color={'blue'}
                                              positions={positions}/>
                                    <Marker position={origin}>
                                        <Popup>{t('routes.origin')}</Popup>
                                    </Marker>
                                    <Marker position={target}>
                                        <Popup>{t('routes.target')}</Popup>
                                    </Marker>
                                </Map>
                            </Row>
                            <Row>
                                {showChart && (
                                    <VictoryChart style={{ parent: { maxWidth: "35%" }}}
                                                  domainPadding={10}
                                                  theme={VictoryTheme.material}>
                                        <VictoryStack colorScale={"cool"}>
                                            <VictoryArea data={elevation}/>
                                        </VictoryStack>
                                    </VictoryChart>
                                )}
                            </Row>
                        </Col>
                        <Col>
                            <div>
                                <Button variant="primary" onClick={handleLoad}>
                                    {t('routes.loadButton')}
                                </Button>
                                <h3>{t('routes.select')}</h3>
                                <Select id={"selectRoute"} options={data}/>
                                <Button onClick={handleSelect}>
                                    {t('routes.button')}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <NotificationContainer/>
                </Container>
            </LoggedIn>
            <LoggedOut>
                <Redirect to="/"></Redirect>
            </LoggedOut>
        </section>
    );
}

export default VisualizeTrack;