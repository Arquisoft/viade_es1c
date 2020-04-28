import FC from "solid-file-client";
import auth from "solid-auth-client";

/*
    *****************************************
    *                                       *
    *   FOLLOWING THE SPECIFICATION V1.1    *
    *                                       *
    * ***************************************
*/

export default class DownloadService {

  constructor() {
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
   * @param {logged in user's webId} webId
   */
  async getPodRoute(webId) {
    /*
        15 == length("profile/card#me")
        "viade/routes/" == folder where the routes are stored
    */
    this.urlRouteInPod = webId.slice(0, webId.length - 15).concat("viade/routes/");
    if (this.HTMLElementUrlValue !== null){
      let selectedRouteName = this.HTMLElementUrlValue.concat(".json");
      this.urlRouteInPod = this.urlRouteInPod.concat(selectedRouteName);
    }
  }

  /**
   * Aux method that return the webId of the user who is logged in.
   * @param {current session} session
   */
  async getSessionId(session) {
    let webId = session.webId;
    await this.getPodRoute(webId);
  }

  /**
   * Aux method to return the session with it's logged in.
   */
  async getSession(){
    await auth.trackSession((session) => {
      if (!session){
        return;
      } else {
        this.session = session;
      }
    });
    await this.getSessionId(this.session);
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
    await this.getSession();
    try {
      await this.downloadTrack(this.HTMLElementUrlValue);
    } catch (SFCFetchError){
      this.error = "Error al descargar";
    }
  }

  /**
   * Aux method that extracts track's name without extension
   * @param {content of readFile} content
   */
  async getRoutesNames(content) {
    if (content.files.length === 0) {
      this.warning = "No hay contenido";
    } else {
      for (let i = 0; i < content.files.length; i++) {
        this.extension = content.files[parseInt(i)].name.split(".");
        if (this.extension[this.extension.length - 1].localeCompare("json") === 0) {
          // 5 == length(".json")
          this.routes.push(content.files[parseInt(i, 10)].name.slice(0, content.files[parseInt(i, 10)].name.length - 5));
        }
      }
      this.success = "Cargo rutas";
    }
  }

  /**
   * Method that returns my tracks stored in pod
   */
  async getRoutesFromPod() {
    await this.getSession();
    const fc = new FC(auth);
    try {
      this.content = await fc.readFolder(this.urlRouteInPod, null);
      await this.getRoutesNames(this.content);
    } catch (SFCFetchError) {
      this.errorLoad = true;
    }
  }
}