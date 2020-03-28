import React, {useState, useCallback} from "react";
import {Marker, Popup, TileLayer, Polyline, Map} from "react-leaflet";
import { VictoryArea, VictoryChart, VictoryTheme, VictoryStack } from 'victory';
import {LoggedIn, LoggedOut} from "@solid/react";
import {Button, Col, Row, Container} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import L from 'leaflet';
import {Select} from '../../utils/select/Select';
import {NotificationContainer, NotificationManager} from "react-notifications";
import { Redirect } from "react-router-dom";
import ImageViewer from 'react-simple-image-viewer';
import ReactPlayer from 'react-player'
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

let actualIndexVideo = 0;
/**
 * Component used to display routes on a map
 */
export const VisualizeTrack = (props) => {

    // Locales for i18n
    const {t} = useTranslation();

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [images, setImages] = useState([]);

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

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

    // Hooks for multimedia
    const [showImage, setShowImage] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [playingVideo, setPlayingVideo] = useState(false);
    const [videos, setVideos] = useState([]);
    const [actualVideo, setActualVideo] = useState("");

    async function handleLoad(event){
        let vService = new VisualizeService(null);
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
        let vService = new VisualizeService(document.getElementById("selectRoute"));
        await vService.fillMap();
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
            handleMultimedia(vService)
        }
    }

    function handleMultimedia(vService) {
        setShowVideo(false);
        setShowImage(false);
        if (vService.videos.length > 0) {
            setShowVideo(true);
            setVideos(vService.videos);
            setActualVideo(vService.videos[actualIndexVideo]);
        }
        if (vService.images.length > 0) {
            setShowImage(true);
            setImages(vService.images);
        } else {
            setShowImage(false);
            setShowVideo(false);
            if (!vService.permissions) {
                NotificationManager.error(t('routes.permissionsErrorMessage'), t('routes.permissionsErrorTitle'), 3000);
            }
        }
    }

    function handlePowerOff() {
        setPlayingVideo(false);
    }

    function handlePowerOn() {
        setPlayingVideo(true);
    }

    function handleNext() {
        if (actualIndexVideo < videos.length - 1) {
            actualIndexVideo++;
            setActualVideo(videos[actualIndexVideo]);
        }
    }

    function handlePrevious() {
        if (actualIndexVideo > 0) {
            actualIndexVideo--;
            setActualVideo(videos[actualIndexVideo]);
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
                                {!isViewerOpen && (
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
                                )}
                            </Row>
                            <Row>
                                {showElements && (
                                  <Col>
                                    <VictoryChart style={{ parent: { maxWidth: "80%" }}} domainPadding={10} theme={VictoryTheme.material}>
                                        <VictoryStack colorScale={"cool"}>
                                            <VictoryArea data={elevation}/>
                                        </VictoryStack>
                                    </VictoryChart>
                                  </Col>
                                )}
                                <Col>
                                    {showImage && (
                                      <Row>
                                          <div className="img_viewer">
                                              {images.map((src, index) => (
                                                <img className="my_Img" src={ src } onClick={ () => openImageViewer(index) } width="80" key={index}/>
                                              ))}
                                              {isViewerOpen && (
                                                    <ImageViewer src={images} currentIndex={currentImage} onClose={closeImageViewer}/>
                                              )}
                                          </div>
                                      </Row>
                                    )}
                                    {showVideo && (
                                      <Row>
                                          <div>
                                              <ReactPlayer playing={playingVideo} className="player-format" url={actualVideo} width='auto' height='230px'/>
                                              <Button className="button-margin" onClick={handlePowerOn}>Play</Button>
                                              <Button className="button-margin" onClick={handlePowerOff}>Stop</Button>
                                              <Button className="button-margin" onClick={handleNext}>Next</Button>
                                              <Button className="button-margin" onClick={handlePrevious}>Previous</Button>
                                          </div>
                                      </Row>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <div>
                                <Button className="visualizeButton" variant="primary"
                                        onClick={handleLoad}>
                                    {t('routes.loadButton')}
                                </Button>
                                <h3>{t('routes.select')}</h3>
                                <Select className="select-format" id={"selectRoute"} options={data}/>
                                <Button className="visualizeButton" onClick={handleSelect}>
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