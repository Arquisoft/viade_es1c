import React from "react";
import { Marker, Popup, TileLayer } from "react-leaflet";
import { MapStyled, MapWrapper } from './vMap.style';
import { useTranslation } from "react-i18next";
import { Combobox } from 'react-widgets';

/**
 * Component used to display routes on a map
 */

export const  VMapComponent = props => {
  const state = {
    lat: 43.354444,
    lng: -5.85166,
    zoom: 12
  }
  //Sustituir por las rutas del pod
  const data=['ruta1','ruta2','ruta3'];
  
  const { t } = useTranslation();
  const position = [state.lat, state.lng];
  const {combo}= verCombo();

  return (
    <MapWrapper>
      <h1>{t('routes.title')}</h1>
      <div>
        {combo}
      </div>
      <MapStyled center = {position} zoom = {state.zoom} >
        <TileLayer url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapStyled>
    </MapWrapper>
  );
}

function verCombo(){
  return (
    <Combobox 
      data={['ruta1','ruta2']}
      defaultValue={"ruta1"}
    />
  );
}

export default VMapComponent;