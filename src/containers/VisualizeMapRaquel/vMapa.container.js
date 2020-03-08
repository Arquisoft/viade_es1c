import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import * as parkData from "./data/skateboard-parks.json";
import "./app.css";

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

class VMapaComponent extends Component<Props, State> {

const Moves = props => {
  return (
    <div style={styles.wrapper}>
      <Map style={styles.map} center={props.center} zoom={props.zoom}>
        <TileLayer url={props.url} />
      </Map>
    </div>
  );
}

Moves.defaultProps = {
  center: [27.9361805667694, -15.589599609374998],
  zoom: 10,
  url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png'
};

}
export default VMapaComponent;





// export default function app() {
  // return (
    // <map center={[45.4, -75.7]} zoom={12}>
      // <tilelayer
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="http://osm.org/copyright">openstreetmap</a> contributors'
      // />
    // </map>
  // );

/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
// export class VMapComponent extends Component<Props> {
  // constructor(props) {
    // super(props);

    // this.state = {
      // name: '',
      // image: defaultProfilePhoto,
      // isLoading: false,
      // hasImage: false
    // };
  // }

  // componentDidMount() {
    // const { webId } = this.props;
    // if (webId) this.getProfileData();
  // }

  // componentDidUpdate(prevProps) {
    // const { webId } = this.props;
    // if (webId && webId !== prevProps.webId) this.getProfileData();
  // }

// }




















