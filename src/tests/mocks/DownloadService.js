/**
 * Simulating access to POD and download tracks
 */
export default class DownloadService {

  constructor() {
    this.error = "";
    this.warning = null;
    this.errorLoad = false;
    this.success = null;
    this.routes = [];
  }

  searchTrack(value1, value2) {
    this.success = null;
    this.error = null;
    this.warning = null;
    this.errorLoad = false;
    if (value1.localeCompare("Ruta1")) {
      this.success = "Correct";
    } else if (value1.localeCompare("Ruta2")) {
      this.errorLoad = true;
    } else if (value1.localeCompare("Ruta3")) {
      this.warning = "Warning";
    }
  }

  getRoutesFromPod() {
    this.routes = ["Ruta1","Ruta2", "Ruta3"];
  }
}