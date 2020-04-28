import React, {useState, useCallback} from "react";
import {Marker, Popup, TileLayer, Polyline, Map} from "react-leaflet";
import { VictoryArea, VictoryChart, VictoryTheme, VictoryStack } from "victory";
import {Button, Col, Row, Container} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import L from "leaflet";
import {Select} from "../../../utils/select/Select";
import {NotificationContainer, NotificationManager} from "react-notifications";
import ImageViewer from "react-simple-image-viewer";
import ReactPlayer from "react-player";
import LoadingOverlay from "react-loading-overlay";
import VisualizeService from "../../../../services/VisualizeService";

// CSS imports
import "leaflet/dist/leaflet.css";
import "./VisualizePanel.css";
import "react-notifications/lib/notifications.css";

// Marker's icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

let actualIndexVideo = 0;   // For actual index video
let selectedFilter; // For actual filter

/**
 * Component used to display routes on a map
 */
export const VisualizePanel = ({service}) => {
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

  // For tracks filter
  const myTracks = "Mis rutas";
  const shared = "Compartidas";

  // Loading
  const [loading, setLoading] = useState(false);
  
  // Handle visualize button
  const [disableVisualize, setDisableVisualize] = useState(true);

  /**
   * Function that handle select radioButton
   */
  function handleFilter() {
    if (selectedFilter !== undefined ){
      if (selectedFilter.localeCompare(shared) === 0) {
        document.getElementById("radio-2").checked = true;
      } else if (selectedFilter.localeCompare(myTracks) === 0) {
        document.getElementById("radio-1").checked = true;
      }
    }
  }

  /**
   * Fuction to handle load select event
   * @returns {Promise<void>}
   */
  async function handleLoad(){
    let vService = service;
    if (vService instanceof VisualizeService) {
      vService = new VisualizeService();
    }
    if (document.getElementById("radio-1").checked === true){
      selectedFilter = myTracks;
      await vService.getMyRoutesFromPod();
    } else if (document.getElementById("radio-2").checked === true){
      selectedFilter = shared;
      await vService.getSharedRoutesFromPod();
    }
    if (vService.warning !== null){
      NotificationManager.warning(t("routes.loadWarningMessage"), t("routes.loadWarningTitle"), 3000);
    } else if (vService.errorLoad || selectedFilter === undefined)  {
      NotificationManager.error(t("routes.errorMessage"), t("routes.errorTitle"), 3000);
    } else {
      setDisableVisualize(false);
      NotificationManager.success(t("routes.successLoadMessage"), t("routes.successLoadTitle"), 2000);
      setData(vService.routes);
    }
    handleFilter();
  }

  /**
   * Function to handle display map, histogram and multimedia event
   * @returns {Promise<void>}
   */
  async function handleSelect(){
    setLoading(true);
    let vService = service;
    if (vService instanceof VisualizeService) {
      vService = new VisualizeService();
    }
    await vService.fillMap(selectedFilter, document.getElementById("selectRoute"));
    if (vService.error != null){
      NotificationManager.error(t("routes.errorMessage"), t("routes.errorTitle"), 3000);
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

      if (vService.mostrar === true) {
        setShowElements(true);
      }
      if (vService.existsMultimedia === true) {
        handleMultimedia(vService);
      }
    }
    setLoading(false);
    handleFilter();
  }

  /**
   * Fuction to handle multimedia hooks and advices
   * @param vService
   */
  function handleMultimedia(vService) {
    setShowVideo(false);
    setShowImage(false);
    if (vService.videos.length > 0 || vService.images.length > 0) {
      if (vService.images.length > 0) {
        setShowImage(true);
        setImages(vService.images);
      }
      if (vService.videos.length > 0) {
        setShowVideo(true);
        setVideos(vService.videos);
        setActualVideo(vService.videos[actualIndexVideo]);
      }
    } else {
      setShowImage(false);
      setShowVideo(false);
      if (!vService.permissionsImage && vService.existsImage === true) {
        NotificationManager.error(t("routes.imageErrorMessage"), t("routes.imageErrorTitle"), 3000);
      }
      if (!vService.permissionsVideo && vService.existsVideo === true) {
        NotificationManager.error(t("routes.videoErrorMessage"), t("routes.videoErrorTitle"), 3000);
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
    <section data-testid="visualizeTest">
      <LoadingOverlay active={loading} spinner text={t("routes.loading")}>
        <Container data-testid="containerVisualTest">
          <Row>
            <h1 className="myH1">{t("routes.title")}</h1>
          </Row>
          <Row>
            <Col sm={10}>
              <Row data-testid="visualizeTest2">
                {!isViewerOpen && (
                  <Map className="map" center={center} zoom={zoom}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    {showElements && (
                      <div>
                        <Polyline color={"blue"}
                                  positions={positions}/>
                        <Marker position={origin}>
                          <Popup>{t("routes.origin")}</Popup>
                        </Marker>
                        <Marker position={target}>
                          <Popup>{t("routes.target")}</Popup>
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
                      <h4 id="h4PerfilElevacion" className="h4-format">{t("routes.histogram")}</h4>
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
                  {(showImage || showVideo) && (
                    <Row>
                      <h4 className="h4-format">{t("routes.multimedia")}</h4>
                    </Row>
                  )}
                  {showImage && (
                    <div>
                      <Row>
                        <div className="img_viewer formal-div">
                          {images.map((src, index) => (
                            <img data-testid="btnImagenTest" className="my_Img" src={src} onClick={() => openImageViewer(index)} width="90" id={"" + index} key={index} alt=""/>
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
                        <Button data-testid="btnPowerOnTest" className="button-margin" onClick={handlePowerOn}>{t("routes.play")}</Button>
                        <Button data-testid="btnPowerOffTest" className="button-margin" onClick={handlePowerOff}>{t("routes.stop")}</Button>
                        <Button data-testid="btnNextTest" className="button-margin" onClick={handleNext}>{t("routes.next")}</Button>
                        <Button data-testid="btnPreviousTest" className="button-margin" onClick={handlePrevious}>{t("routes.previous")}</Button>
                      </div>
                    </Row>
                  )}
                </Col>
              </Row>
            </Col>
            <Col>
              <div>
                <Row>
                  <label data-testid="label1Test" className="radio-format" name="filter-label">
                    <input data-testid="inputLabel1" name="filter-radio" id="radio-1" type="radio" checked={true} onChange={handleFilter}/>
                    {t("routes.myTracks")}
                  </label>
                  <label className="radio-format" name="filter-label">
                    <input data-testid="inputLabel2" name="filter-radio" id="radio-2" type="radio"/>
                    {t("routes.shared")}
                  </label>
                </Row>
                <Button id="loadButton" data-testid="btn1VTest" className="visualizeButton" variant="primary"
                        onClick={handleLoad}>
                  {t("routes.loadButton")}
                </Button>
                <h3>{t("routes.select")}</h3>
                <Select data-testid="combo" className="select-format" id={"selectRoute"} options={data}/>
                <div>
                  <Button id="visualizeRouteButton" data-testid="btn2VTest" className="visualizeButton" onClick={handleSelect} disabled={disableVisualize}>
                    {t("routes.button")}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <NotificationContainer/>
        </Container>
      </LoadingOverlay>
    </section>
  );
};

export default VisualizePanel;