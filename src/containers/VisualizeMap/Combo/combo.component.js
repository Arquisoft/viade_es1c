import React from "react";
import { Marker, Popup, TileLayer} from "react-leaflet";
//Podría ser un DropDown
//import { Combobox } from 'react-widgets';
//import { Combobox } from '@progress/kendo-react-dropdowns';

/**
 * Component used to display routes on a map
 */

class ComboComponent extends React.Component {
  constructor(){
    super();
    this.state = {
      lat: 43.354444,
      lng: -5.85166,
      zoom: 12
    };
	
	//Sustituir por las rutas del pod
	this.data=['ruta1','ruta2','ruta3'];
	
  }
  
  render() {
    return (
      this.data
		// <Combobox 
			// data={this.data}
			// defaultValue={"ruta1"}
		// />
    );
  }

}

export default ComboComponent;