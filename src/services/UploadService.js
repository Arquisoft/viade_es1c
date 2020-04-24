import FC from "solid-file-client";
import auth from "solid-auth-client";

/*
    *****************************************
    *                                       *
    *   FOLLOWING THE SPECIFICATION V1.1    *
    *                                       *
    * ***************************************
*/

export default class UploadService {

  constructor() {
    this.HTMLElement = null;
    this.error = false;
    this.success = false;
    this.errorPermissions = false;
    this.urlRouteInPod = null;
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
    this.urlRouteInPod = webId.slice(0, webId.length - 15).concat("viade/routes");
  }

  /**
   * Aux method to process the track file.
   * Obtain the content and upload the file to the Solid
   * POD
   * @param nameFile - File's name
   * @param track - The track to upload
   * @returns {Promise<*>}
   */

  async processFile(track, nameFile) {
    let reader = new FileReader();
    reader.onload = function() {
      let fileContent = reader.result;
      const auth = require("solid-auth-client");
      auth.trackSession((session) => {
        if (!session) {
          return;
        } else {
          /*
            15 == length("profile/card#me")
            "viade/routes/" == folder where the routes are stored
          */
          let webId = session.webId;
          let urlRouteInPod = webId.slice(0, webId.length - 15).concat("viade/routes/").concat(nameFile);
          const fc = new FC(auth);
          fc.createFile(urlRouteInPod, fileContent, "text/turtle", {}).then(() => {}
          ).catch((err) => this.error = "Error ".concat(err));
        }
      });
    };
    reader.readAsText(track);
  }

  /**
   * Process the case of an individual track to upload
   * @param track - Track to upload
   * @returns {Promise<void>}
   */

  async processTrack(track) {
    let times = 0;  // To avoid too much success message
    let nameFile = track.name;
    let extension = nameFile.split(".");
    if (!extension[1].localeCompare("json")) {
      if (times === 0) {
        this.success = true;
        times++;
      }
      await this.processFile(track, nameFile);
    } else {
      this.error = true;
    }
  }

  /**
   * Process the case of multiple tracks
   * to upload.
   * @param tracks - Track array
   * @returns {Promise<void>}
   */

  async processMultipleTrack(tracks) {
    tracks.forEach(async (track) => {
      await this.processTrack(track);
    });
  }

  /**
   * Aux method to check read permissions
   * @returns {Promise<boolean>}
   */
  async readPermission(url) {
    const fc = new FC(auth);
    url = url.concat("/test.ttl");
    await fc.createFile(url, null);
    await fc.delete(url);
  }

  /**
   * Perform multiple upload of tracks
   * @param {*} HTMLElement {input file}
   * @returns {Promise<void>}
   */

  async handleUpload(HTMLElement) {
    this.HTMLElement = HTMLElement;
    const fileInput = this.HTMLElement;
    const tracks = fileInput.files;
    await this.getSession();
    try {
      await this.readPermission(this.urlRouteInPod);
      await this.processMultipleTrack(tracks);
    } catch (SFCFetchError) {
      this.errorPermissions = true;
    }
  }
}