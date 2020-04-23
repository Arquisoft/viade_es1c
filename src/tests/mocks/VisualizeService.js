/**
 * Simulating access to POD and visualize tracks
 */
export default class VisualizeService {

  constructor() {
    this.warning = null;
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
	  this.mostrar = false;
  }
  
  
  getMyRoutesFromPod() {
    let myRoutes = ["Ruta1", "Ruta2", "Ruta3"];
    this.routes = myRoutes;
  }

  getSharedRoutesFromPod() {}

  fillMap(selectedFilter, HTMLElement) {
    this.permissionsImage = true;
    if (HTMLElement.value.localeCompare("Ruta2")) {
      this.images = [];
      this.permissionsImage = false;
      this.existsImage = false;
    } else if (HTMLElement.value.localeCompare("Ruta3")) {
      this.videos = [];
      this.permissionsVideo = false;
      this.existsVideo = false;
    }
  }
}