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

  constructor(HTMLElementDown, HTMLElementUrlValue) {
    this.error = null;
    this.HTMLElementDown = HTMLElementDown;
    this.HTMLElementUrlValue = HTMLElementUrlValue;
    this.urlRouteInPod = "";
    this.webId = "";
  }

  /**
   * Aux method to return the session with it's logged in.
   */
  async getSession(){
    await auth.trackSession(session => {
      if (!session){
        return;
      } else {
        this.session = session;
      }
    })
    await this.getSessionId(this.session);
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
   * Aux method that returns the route to tracks upload in the pod.
   * @param {logged in user's webId} webId
   */
  async getPodRoute(webId) {
    /*
        15 == length("profile/card#me")
        "viade/routes/" == folder where the routes are stored
    */
    this.urlRouteInPod = webId.slice(0, webId.length - 15).concat("viade/routes/");
    if (this.HTMLElementUrlValue != null){
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
  async searchTrack() {
    await this.getSession();
    try {
      await this.downloadTrack(this.HTMLElementUrlValue);
    } catch (SFCFetchError){
      this.error = "Error al descargar";
    }
  }
}