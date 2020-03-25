import React, {useState} from "react";
import {Marker, Popup, TileLayer, Polyline, Map} from "react-leaflet";
import { VictoryArea, VictoryChart, VictoryTheme, VictoryStack } from 'victory';
import {LoggedIn, LoggedOut} from "@solid/react";
import {Button, Col, Row, Container} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import L from 'leaflet';
import {Select} from '../../utils/select/Select';
import {NotificationContainer} from "react-notifications";
import { Redirect } from "react-router-dom";
import VisualizeService from "../../../services/VisualizeService";
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


    // Hooks for polyline, map, histogram
    // Setting default values
    const zoomValue = 11;
    const [zoom, setZoom] = useState(zoomValue);
    const [positions, setPositions] = useState();
    const [center, setCenter] = useState([43.354444, -5.851667]);
    const [origin, setOrigin] = useState(0);
    const [target, setTarget] = useState(0);
    const [data, setData] = useState([]);
    const [elevation, setElevation] = useState([]);
    const [showElements, setShowElements] = useState(false);

    async function handleLoad(event){
        let vService = new VisualizeService();
        await vService.getRoutesFromPod();
        if (vService.warning != null){
            NotificationManager.warning(t('routes.loadWarningMessage'), t('routes.loadWarningTitle'), 2000);
        } else {
            NotificationManager.success(t('routes.successLoadMessage'), t('routes.successLoadTitle'), 2000);
        }
        event.preventDefault();
        setData(vService.routes);
    }

    async function handleSelect(event){
        let vService = new VisualizeService();
        await vService.fillMap(document.getElementById("selectRoute"));
        if (vService.error != null){
            NotificationManager.error(t('routes.errorMessage'), t('routes.errorTitle'), 2000);
        } else {
            event.preventDefault();
            let points = vService.points;
            let elevationsValues = vService.elevationsValues;
            console.log(vService.error);
            // We show the points of the route in the map
            setOrigin(points[0]);
            setTarget(points[points.length - 1]);
            setCenter(points[0]);
            setPositions(points);
            setZoom(zoomValue);
            setElevation(elevationsValues);
            setShowElements(true);
        }
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
                                    {showElements && (
                                        <div>
                                            <Polyline color={'blue'}
                                                      positions={positions}/>
                                            <Marker position={origin}>
                                                <Popup>{t('routes.origin')}</Popup>
                                            </Marker>
                                            <Marker position={target}>
                                                <Popup>{t('routes.target')}</Popup>
                                            </Marker>
                                        </div>
                                        )}
                                </Map>
                            </Row>
                            <Row>
                                {showElements && (
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
                                <Button className="visualizeButton" variant="primary"
                                        onClick={handleLoad}>
                                    {t('routes.loadButton')}
                                </Button>
                                <h3>{t('routes.select')}</h3>
                                <Select id={"selectRoute"} options={data}/>
                                <Button className="visualizeButton" onClick={async () => {handleSelect}}>
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