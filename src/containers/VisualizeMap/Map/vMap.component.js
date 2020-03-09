import React from "react";
import { Marker, Popup, TileLayer } from "react-leaflet";
import { MapStyled, MapWrapper, SelectWrapper, SelectStyled, H1, H3} from './vMap.style';
import { useTranslation } from "react-i18next";
import SplitPane from 'react-split-pane';

/**
 * Component used to display routes on a map
 */

export const  VMapComponent = props => {
  const state = {
    lat: 43.354444,
    lng: -5.85166,
    zoom: 12
  }
  // Sustituir por las rutas del POD
  const data=['Ruta1','Ruta2','Ruta3'];
  const { t } = useTranslation();
  const position = [state.lat, state.lng];

  return (
    <MapWrapper>
      <SplitPane split="horizontal" minSize={50} maxSize={300} defaultSize={100}>
        <H1>{t('routes.title')}</H1>
        <SplitPane split="horizontal" primary="second">
          <SplitPane split="vertical">
            <SelectWrapper>
              <H3>{t('routes.select')}</H3>
              <SelectStyled options={data}/>
            </SelectWrapper>
            <SplitPane split="vertical" primary="second" defaultSize={200} maxSize={400} minSize={100}>
                <MapStyled center = {position} zoom = {state.zoom} >
                  <TileLayer url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapStyled>
            </SplitPane>
          </SplitPane>
        </SplitPane>
      </SplitPane>
    </MapWrapper>
  );
}


export default VMapComponent;