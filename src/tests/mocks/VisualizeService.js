export default class VisualizeService {

  constructor() {
    this.warning=null;
    this.errorLoad = "";
    this.routes = [];
    this.points = [];
    this.elevationsValues = [];
    this.existsMultimedia = true;
    this.images = [];
    this.videos = [];
    this.permissionsImage = true;
    this.permissionsVideo = true;
    this.existsVideo = true;
    this.existsImage = true;
	this.mostrar=false;
  }
  
  
  getMyRoutesFromPod() {
    const myRoutes = ["Ruta1"];
    this.routes = myRoutes;
  }

  getSharedRoutesFromPod() {

  }

  fillMap(selectedFilter, HTMLElement) {

  }

}