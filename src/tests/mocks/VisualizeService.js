export default class VisualizeService {

  constructor() {
    this.warning=null;
    this.errorLoad = "";
    this.routes = [];
    this.points = [];
    this.elevationsValues = [];
    this.existsMultimedia = true;
    this.images = ["https://miguelornia.solid.community/viade/resources/83357_2880_1800.jpg","https://miguelornia.solid.community/viade/resources/logo192.png"];
    this.videos = ["https://miguelornia.solid.community/viade/resources/video.mp4","https://miguelornia.solid.community/viade/resources/video1.mp4"];
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