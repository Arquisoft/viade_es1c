import React, { useState } from "react";
import { Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import { MapStyled, MapWrapper, SelectWrapper, SelectStyled, H1, H3, Button} from './vMap.style';
import { useTranslation } from "react-i18next";
import SplitPane from 'react-split-pane';
import { routesService } from "@services";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

export const  VMapComponent = props => {
  // Sustituir por las rutas del POD
  const data = ['Ruta1', 'Ruta2', 'Ruta3', 'Ruta4'];

  // Locales for i18n
  const { t } = useTranslation();

  // Values
  var route = routesService.getRoute(data[0]);
  var points = routesService.getPointsOfRouteAsArray(route);
  const zoomValue = 11; // Zoom value

  // Hooks for polyline and map
  const [zoom, setZoom] = useState(zoomValue);
  const [positions, setPositions] = useState(points);
  const [center, setCenter] = useState(points[0]);
  const [origin, setOrigin] = useState(points[0]);
  const [target, setTarget] = useState(points[points.length-1]);


  /**
   * Function that handles the route change event
   * @param event
   */

  function handleSelect(event) {
    event.preventDefault();
    var selectedRoute = document.getElementById("selectRoute");
    route = routesService.getRoute(selectedRoute.value);
    points = routesService.getPointsOfRouteAsArray(route);
    setOrigin(points[0]);
    setTarget(points[points.length-1]);
    setCenter(points[0]);
    setPositions(points);
    setZoom(zoomValue);
  }

  return (
    <MapWrapper>
      <SplitPane split="horizontal" minSize={50} maxSize={300} defaultSize={100}>
        <H1>{t('routes.title')}</H1>
        <SplitPane split="horizontal" primary="second">
          <SplitPane split="vertical">
            <SelectWrapper>
              <H3>{t('routes.select')}</H3>
              <SelectStyled id={"selectRoute"} options={data}/>
              <Button className="ids-link-filled" onClick={handleSelect}>
                {t('routes.button')}
              </Button>
            </SelectWrapper>
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
            </SplitPane>
          </SplitPane>
        </SplitPane>
      </SplitPane>
    </MapWrapper>
  );
}

export default VMapComponent;