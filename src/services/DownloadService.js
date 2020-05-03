import FC from "solid-file-client";
import auth from "solid-auth-client";
import AbstractService from "./AbstractService";

/*
    *****************************************
    *                                       *
    *   FOLLOWING THE SPECIFICATION V1.1    *
    *                                       *
    * ***************************************
*/

export default class DownloadService extends AbstractService{

  constructor() {
    super();
    this.error = null;
    this.HTMLElementDown = null;
    this.HTMLElementUrlValue = null;
    this.urlRouteInPod = "";
    this.webId = "";
    this.routes = [];
    this.extension = null;
    this.warning = null;
    this.errorLoad = false;
    this.success = null;
    this.content = "";
  }

  /**
   * Aux method that returns the route to tracks upload in the pod.
   */
  async getPodRoute() {
    await super.getSession();
    this.urlRouteInPod = this.webId.slice(0, this.webId.length - this.viadeRoute).concat("viade/routes/");
    if (this.HTMLElementUrlValue !== null){
      let selectedRouteName = this.HTMLElementUrlValue.concat(".json");
      this.urlRouteInPod = this.urlRouteInPod.concat(selectedRouteName);
    }
  }

  /**
   * Aux method to download the track
   * @param name - name of the track to download
   * @returns {Promise<void>}
   */
  async downloadTrack(name) {
    const fc = new FC(auth);
    let file = await fc.readFile(this.urlRouteInPod);
    let blob = new Blob([file], { type: "application/json" });
    let link = this.HTMLElementDown;
    link.href = URL.createObjectURL(blob);
    link.download = name + ".json";
    link.click();
  }

  /**
   * Obtains the track to download
   * @returns {Promise<void>}
   */
  async searchTrack(HTMLElementUrlValue, HTMLElementDown) {
    this.HTMLElementUrlValue = HTMLElementUrlValue;
    this.HTMLElementDown = HTMLElementDown;
    await this.getPodRoute();
    try {
      await this.downloadTrack(this.HTMLElementUrlValue);
    } catch (SFCFetchError){
      this.error = "Error al descargar";
    }
  }

  /**
   * Method that returns my tracks stored in pod
   */
  async getRoutesFromPod() {
    await this.getPodRoute();
    const fc = new FC(auth);
    try {
      this.content = await fc.readFolder(this.urlRouteInPod, null);
      await super.getRoutesNames(this.content, this.extension, this.routes);
    } catch (SFCFetchError) {
      this.errorLoad = true;
    }
  }
}