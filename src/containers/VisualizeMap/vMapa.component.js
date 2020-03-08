import React from "react";
import { Marker, Popup, TileLayer } from "react-leaflet";
import { Mapa } from './vMap.style';

/**
 * Component used to display routes on a map
 */

class VMapaComponent extends React.Component {
  constructor(){
    super();
    this.state = {
      lat: 43.354444,
      lng: -5.85166,
      zoom: 12
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Mapa center = {position} zoom = {this.state.zoom} >
        <TileLayer url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </Mapa>
    );
  }
}

export default VMapaComponent;