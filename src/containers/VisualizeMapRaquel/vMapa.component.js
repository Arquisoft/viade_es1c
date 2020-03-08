import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
//import * as parkData from "./data/skateboard-parks.json";
//import "./app.css";

const styles = {
  wrapper: { 
    height: 400, 
    width: '80%', 
    margin: '0 auto', 
    display: 'flex' 
  },
  map: {
    flex: 1
  } 
};

//class VMapaComponent extends Component<Props, State> {

const VMapaComponent = props => {
  return (
    <div style={styles.wrapper}>
      <Map style={styles.map} center={props.center} zoom={props.zoom}>
        <TileLayer url={props.url} />
      </Map>
    </div>
  );
}

VMapaComponent.defaultProps = {
  center: [27.9361805667694, -15.589599609374998],
  zoom: 10,
  url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png'
};


export default VMapaComponent;