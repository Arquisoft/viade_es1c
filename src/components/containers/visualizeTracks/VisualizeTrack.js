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
import ReactPlayer from 'react-player';
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

let actualIndexVideo = 0;   // For actual index video
/**
 * Component used to display routes on a map
 */
export const VisualizeTrack = () => {
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

    // Hooks for images
    const [showImage, setShowImage] = useState(false);
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

    // Hooks for video
    const [showVideo, setShowVideo] = useState(false);
    const [playingVideo, setPlayingVideo] = useState(false);
    const [videos, setVideos] = useState([]);
    const [actualVideo, setActualVideo] = useState("");

    /**
     * Fuction to handle load select event
     * @returns {Promise<void>}
     */
    async function handleLoad(){
        let vService = new VisualizeService(null);
        await vService.getRoutesFromPod();
        if (vService.warning != null){
            NotificationManager.warning(t('routes.loadWarningMessage'), t('routes.loadWarningTitle'), 2000);
        } else {
            NotificationManager.success(t('routes.successLoadMessage'), t('routes.successLoadTitle'), 2000);
        }
        setData(vService.routes);
    }

    /**
     * Funcion to handle display map, histogram and multimedia event
     * @returns {Promise<void>}
     */
    async function handleSelect(){
        let vService = new VisualizeService(document.getElementById("selectRoute"));
        await vService.fillMap();
        if (vService.error != null){
            NotificationManager.error(t('routes.errorMessage'), t('routes.errorTitle'), 2000);
        } else {
            let points = vService.points;
            let elevationsValues = vService.elevationsValues;
            // We show the points of the route in the map
            setOrigin(points[0]);
            setTarget(points[points.length - 1]);
            setCenter(points[0]);
            setPositions(points);
            setZoom(zoomValue);
            setElevation(elevationsValues);
            setShowElements(true);
            handleMultimedia(vService);
        }
    }

    /**
     * Fuction to handle multimedia hooks and advices
     * @param vService
     */
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
            if (!vService.permissionsImage) {
                NotificationManager.error(t('routes.imageErrorMessage'), t('routes.imageErrorTitle'), 3000);
            }
            if (!vService.permissionsVideo) {
                NotificationManager.error(t('routes.videoErrorMessage'), t('routes.videoErrorTitle'), 3000);
            }
        }
    }

    /**
     * Fuction to set power off the video player
     */
    function handlePowerOff() {
        setPlayingVideo(false);
    }

    /**
     * Fuction to set power on the video player
     */
    function handlePowerOn() {
        setPlayingVideo(true);
    }

    /**
     * Fuction to set next video
     * CHECK THIS FUNCTION
     */
    function handleNext() {
        if ((actualIndexVideo + 1 <= (videos.length - 1)) && (videos.length > 1)) {
            actualIndexVideo++;
            setActualVideo(videos[actualIndexVideo]);
        }
    }

    /**
     * Fuction to set previous video
     */
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
                                      <Row>
                                          <h4 className="h4-format">{t('routes.histogram')}</h4>
                                      </Row>
                                      <Row>
                                          <VictoryChart style={{ parent: { maxWidth: "80%" }}} domainPadding={10} theme={VictoryTheme.material}>
                                              <VictoryStack colorScale={"cool"}>
                                                  <VictoryArea data={elevation}/>
                                              </VictoryStack>
                                          </VictoryChart>
                                      </Row>
                                  </Col>
                                )}
                                <Col>
                                    {showImage && (
                                      <div>
                                          <Row>
                                              <h4 className="h4-format">{t('routes.multimedia')}</h4>
                                          </Row>
                                          <Row>
                                              <div className="img_viewer formal-div">
                                                  {images.map((src, index) => (
                                                    <img className="my_Img" src={src} onClick={() => openImageViewer(index)} width="90" id={"" + index} key={index} alt=""/>
                                                  ))}
                                                  {isViewerOpen && (
                                                    <ImageViewer src={images} currentIndex={currentImage} onClose={closeImageViewer}/>
                                                  )}
                                              </div>
                                          </Row>
                                      </div>
                                    )}
                                    {showVideo && (
                                      <Row>
                                          <div className="formal-div">
                                              <ReactPlayer playing={playingVideo} className="player-format" url={actualVideo} width='auto' height='230px'/>
                                              <Button className="button-margin" onClick={handlePowerOn}>{t('routes.play')}</Button>
                                              <Button className="button-margin" onClick={handlePowerOff}>{t('routes.stop')}</Button>
                                              <Button className="button-margin" onClick={handleNext}>{t('routes.next')}</Button>
                                              <Button className="button-margin" onClick={handlePrevious}>{t('routes.previous')}</Button>
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