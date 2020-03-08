import React from "react";
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

class VMapaComponent extends React.Component {
  constructor(){
    super();
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center = {position} zoom = {this.state.zoom}>
        <TileLayer url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </Map>
    );
  }
}
  

//render(<VMapaComponent />, document.getElementsById('leaflet-container leaflet-fade-anim leaflet-grab leaflet-touch-drag'))

export default VMapaComponent;