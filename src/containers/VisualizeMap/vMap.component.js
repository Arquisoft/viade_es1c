import React, { useState } from "react";
import { Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import { MapStyled, MapWrapper, SelectWrapper,
  SelectStyled, H1, H3, Button } from './vMap.style';
import { useTranslation } from "react-i18next";
import SplitPane from 'react-split-pane';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import FC from 'solid-file-client';
import { NotificationContainer, NotificationManager } from "react-notifications";

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
export const VMapComponent = props => {

  // Sustituir por las rutas del POD
  //const data = ['rutaDePrueba1', 'rutaDePrueba2', 'rutaDePrueba3', 'rutaDePrueba4'];
  const [data, setData] = useState([]);
  // Locales for i18n
  const { t } = useTranslation();

  // Hooks for polyline and map
  const zoomValue = 11;
  const [zoom, setZoom] = useState(0);
  const [positions, setPositions] = useState(0);
  const [center, setCenter] = useState(0);
  const [origin, setOrigin] = useState(0);
  const [target, setTarget] = useState(0);

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
          for (let i = 0; i < route.itinerary.numberOfItems; i++) {
            let latitude = route.itinerary.itemListElement[i].item.latitude;
            let longitude = route.itinerary.itemListElement[i].item.longitude;
            points.push([latitude, longitude]);
          }
          
          // We show the points of the route in the map
          setOrigin(points[0]);
          setTarget(points[points.length - 1]);
          setCenter(points[0]);
          setPositions(points);
          setZoom(zoomValue);

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
    <MapWrapper>
      <NotificationContainer/>
      <SplitPane split="horizontal" minSize={50} maxSize={300} defaultSize={100}>
        <H1>{t('routes.title')}</H1>
        <SplitPane split="horizontal" primary="second">
          <SplitPane split="vertical">
            <div></div>
            <SplitPane split="vertical" primary="second" defaultSize={200} maxSize={400} minSize={100}>
                <MapStyled center = {center} zoom = {zoom} >
                  <TileLayer url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Polyline color={'blue'}
                                   positions={positions}/>
                  <Marker position={origin}>
                    <Popup>{t('routes.origin')}</Popup>
                  </Marker>
                  <Marker position={target}>
                    <Popup>{t('routes.target')}</Popup>
                  </Marker>
                </MapStyled>
                <SelectWrapper>
                  <Button className="ids-link-filled" onClick={handleLoad}>
                    {t('routes.loadButton')}
                  </Button>
                  <H3>{t('routes.select')}</H3>
                  <SelectStyled id={"selectRoute"} options={data}/>
                  <Button className="ids-link-filled" onClick={handleSelect}>
                    {t('routes.button')}
                  </Button>
                </SelectWrapper>
            </SplitPane>
          </SplitPane>
        </SplitPane>
      </SplitPane>
    </MapWrapper>
  );
}

export default VMapComponent;