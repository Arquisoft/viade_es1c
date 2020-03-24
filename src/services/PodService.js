import FC from "solid-file-client";
import { NotificationManager } from "react-notifications";

let times = 0; // For success message upload

/**
 * Process the case of an individual track to upload
 * @param track - Track to upload
 * @param t - Translation hook for message
 * @returns {Promise<void>}
 */

async function processTrack(track, t) {
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
            if (times === 0) {
              NotificationManager.success(t("upload.successMessage"), t("upload.successTitle"), 2000);
              document.getElementById("fileArea").value = ""; // Clear input file
              times++;
            }
          }).catch(err => console.error(`Error: ${err}`));
        } else {
          NotificationManager.error(t("upload.errorMessage"), t("upload.errorTitle"), 2000);
        }
        times = 0; // Restart times
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

async function processMultipleTrack(tracks, t) {
  tracks.forEach(async (track) => {
    await processTrack(track, t);
  });
}

/**
 * Perform multiple upload
 * @param t - Translation hook for message
 * @returns {Promise<void>}
 */

export async function upload(t) {
  const fileInput = document.getElementById("fileArea");
  const tracks = fileInput.files;
  await processMultipleTrack(tracks, t);
}