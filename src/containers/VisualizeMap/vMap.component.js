import React from "react";
import { Marker, Popup, TileLayer } from "react-leaflet";
import { MapStyled, MapWrapper } from './vMap.style';
import { useTranslation } from "react-i18next";

/**
 * Component used to display routes on a map
 */

export const  VMapComponent = props => {
    const state = {
      lat: 43.354444,
      lng: -5.85166,
      zoom: 12
    }
    const { t } = useTranslation();
    const position = [state.lat, state.lng];
    return (
      <MapWrapper>
        <h1>{t('routes.title')}</h1>
        <MapStyled center = {position} zoom = {state.zoom} >
          <TileLayer url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapStyled>
      </MapWrapper>
    );
}

export default VMapComponent;