import FC from "solid-file-client";

/*
    *****************************************
    *                                       *
    *   FOLLOWING THE SPECIFICATION V1.1    *
    *                                       *
    * ***************************************
*/

export default class UploadService {

  constructor(HTMLElement) {
    this.HTMLElement = HTMLElement;
    this.error = null;
    this.success = null;
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
      auth.trackSession(session => {
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
          ).catch(err => this.error = "Error ".concat(err));
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
        this.success = "Subido con exito";
        times++;
      }
      await this.processFile(track, nameFile);
    } else {
      this.error = "Error";
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
   * Perform multiple upload of tracks
   * @param {*} HTMLElement {input file}
   * @returns {Promise<void>}
   */

  async handleUpload() {
    const fileInput = this.HTMLElement;
    const tracks = fileInput.files;
    await this.processMultipleTrack(tracks);
  }
}