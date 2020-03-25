import auth from 'solid-auth-client';
import FC from 'solid-file-client';

export default class UploadService {

  constructor() {
    this.times = 0; // For success message upload
    this.error = null;
    this.success = null;
  }

  /**
   * Aux method that returns the route to tracks upload in the pod.
   * @param {} webId
   * @param {*} HTMLElement
   */
  async getPodRoute(webId, HTMLElement){
    this.urlRouteInPod = webId.slice(0, webId.length - 15).concat("public/MyRoutes/");
    if (HTMLElement != null){
      let selectedRouteName = HTMLElement.value.concat(".json");
      this.urlRouteInPod = this.urlRouteInPod.concat(selectedRouteName);
    }
    //await getPodRoute(urlRouteInPod);
  }

  /**
   * Aux method that return the webId of the user who is logged in.
   * @param {} session
   * @param {*} HTMLElement
   */
  async getSessionId(session, HTMLElement){
    let webId = session.webId;
    await this.getPodRoute(webId, HTMLElement);
  }

  /**
   * Aux method to return the session with it's logged in.
   * @param {*} HTMLElement
   */
  async getSession(HTMLElement){
    await auth.trackSession(session => {
      if (!session){
        return;
      } else {
        this.session = session;
      }
    })
    await this.getSessionId(this.session, HTMLElement);
  }

  /**
   * Process the case of an individual track to upload
   * @param track - Track to upload
   * @param t - Translation hook for message
   * @returns {Promise<void>}
   */

  async processTrack(track) {
    let reader = new FileReader();
    let nameFile = track.name;
    reader.onload = function(event) {
      let fileContent = reader.result;
      const auth = require("solid-auth-client");
      auth.trackSession(session => {
        if (!session) {
          return;
        } else {
          /*
            15 == length("profile/card#me")
          */
          let webId = session.webId;
          let urlRouteInPod = webId.slice(0, webId.length - 15).concat("public/MyRoutes/").concat(nameFile);
          event.preventDefault();
          const fc = new FC(auth);
          let extension = nameFile.split(".");
          if (!extension[1].localeCompare("json")) {
            fc.createFile(urlRouteInPod, fileContent, "text/turtle", {}).then(() => {
              if (this.times === 0) {
                this.success = "Subido con exito";
                this.times++;
              }
            }).catch(err => console.error(`Error: ${err}`));
          } else {
            this.error = "Error";
          }
          this.times = 0; // Restart times
        }
      });
    };
    reader.readAsText(track);
  }

  /**
   * Process the case of multiple tracks
   * to upload
   * @param tracks - Tracks
   * @param t - Translation hook for message
   * @returns {Promise<void>}
   */

  async processMultipleTrack(tracks) {
    tracks.forEach(async (track) => {
      await this.processTrack(track);
    });
  }

  /**
   * Perform multiple upload
   * @param t - Translation hook for message
   * @returns {Promise<void>}
   */

  async handleUpload(HTMLElement) {
    const fileInput = HTMLElement;
    const tracks = fileInput.files;
    await this.processMultipleTrack(tracks);
  }
}