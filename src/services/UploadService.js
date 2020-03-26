import auth from "solid-auth-client";
import FC from "solid-file-client";

export default class UploadService {

  constructor() {
    this.error = null;
    this.success = null;
    this.urlRouteInPod = null;
    this.nameFile = null;
  }

  /**
   * Aux method that returns the route to tracks upload in the pod.
   * @param {} webId
   * @param {*} HTMLElement
   */
  async getPodRoute(webId, HTMLElement) {
    /*
       15 == length("profile/card#me")
     */
    this.urlRouteInPod = webId.slice(0, webId.length - 15).concat("public/MyRoutes/").concat(this.nameFile);
  }

  /**
   * Aux method that return the webId of the user who is logged in.
   * @param {} session
   * @param {*} HTMLElement
   */
  async getSessionId(session, HTMLElement) {
    let webId = session.webId;
    await this.getPodRoute(webId, HTMLElement);
  }

  /**
   * Aux method to return the session with it's logged in.
   * @param {*} HTMLElement
   */
  async getSession(HTMLElement) {
    await auth.trackSession(session => {
      if (!session) {
        return;
      } else {
        this.session = session;
      }
    });
    await this.getSessionId(this.session, HTMLElement);
  }

  /**
   * Aux method to process the track file
   * @param times
   * @param extension
   * @param fc
   * @param urlInPod
   * @param track
   * @returns {Promise<*>}
   */

  async processFile(extension, fc, urlInPod, track) {
    let times = 0; // For success message upload
    let reader = new FileReader();
    let fileContent = null;
    reader.onload = function() {
      fileContent = reader.result;
      if (!extension[1].localeCompare("json")) {
        fc.createFile(urlInPod, fileContent, "text/turtle", {}).then(() => {
          if (times === 0) {
            this.success = "Subido con exito";
            times++;
          }
        }).catch(err => alert(err));
      } else {
        this.error = "Error";
      }
    }
    times = 0; // Restart times
    reader.readAsText(track);
  }

  /**
   * Process the case of an individual track to upload
   * @param track - Track to upload
   * @returns {Promise<void>}
   */

  async processTrack(track) {
    this.nameFile = track.name;
    await this.getSession(null);
    const fc = new FC(auth);
    let extension = this.nameFile.split(".");
    await this.processFile(extension, fc, this.urlRouteInPod, track);
  }

  /**
   * Process the case of multiple tracks
   * to upload
   * @param tracks - Tracks
   * @returns {Promise<void>}
   */

  async processMultipleTrack(tracks) {
    tracks.forEach(async (track) => {
      await this.processTrack(track);
    });
  }

  /**
   * Perform multiple upload
   * @returns {Promise<void>}
   */

  async handleUpload(HTMLElement) {
    const fileInput = HTMLElement;
    const tracks = fileInput.files;
    await this.processMultipleTrack(tracks);
  }
}