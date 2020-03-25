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

export async function handleUpload(t) {
  const fileInput = document.getElementById("fileArea");
  const tracks = fileInput.files;
  await processMultipleTrack(tracks, t);
}

/**
 * This function is invoked when the user selects a route in the combobox. It's function
 * is to show on the map the selected route. To do so:
 *  1. We obtain the user's webID
 *  2. We search in the user's pod for the specified route
 *  3. We display the new route on the map
 *
 * @param t - Translation hook for message
 * @param hooks for the map and histogram (setOrigin, setTarget, setCenter,
 * setPositions, setZoom, setElevation, setShowElements)
 * @returns {Promise<void>}
 */

export async function handleSelect(t, setOrigin, setTarget, setCenter, setPositions, setZoom, setElevation, setShowElements) {
  const auth = require('solid-auth-client');
  auth.trackSession(session => {
    if (!session) {
      return;
    } else {
      /*
        The webId has the structure: https://uo265308.solid.community/profile/card#me
        We want the structure: https://uo265308.solid.community/public/MyRoutes/

        15 == length("profile/card#me")
      */
      let webId = session.webId;
      let urlRouteInPod = webId.slice(0, webId.length - 15).concat("public/MyRoutes/");
      // We obtain the name of the route from the combobox and build the final URL
      let selectedRouteName = document.getElementById("selectRoute").value.concat(".json");
      urlRouteInPod = urlRouteInPod.concat(selectedRouteName);
      const fc = new FC(auth);
      fc.readFile(urlRouteInPod, null).then((content) => {
        // We obtain the JSON file from the pod
        let route = JSON.parse(content);
        // We obtain the points of the route
        let points = [];
        let elevationsValues = [];
        for (let i = 0; i < route.itinerary.numberOfItems; i++) {
          let latitude = route.itinerary.itemListElement[i].item.latitude;
          let longitude = route.itinerary.itemListElement[i].item.longitude;
          let elevationValue = route.itinerary.itemListElement[i].item.elevation.split(" ");
          elevationsValues.push({ x: 'P'.concat(i+1), y: parseInt(elevationValue[0], 10)});
          points.push([latitude, longitude]);
        }
        // Hooks for the points
        setOrigin(points[0]);
        setTarget(points[points.length - 1]);
        setCenter(points[0]);
        setPositions(points);
        setZoom(11);
        setElevation(elevationsValues);
        setShowElements(true);
      }).catch(err => NotificationManager.error(t('routes.errorMessage'), t('routes.errorTitle'), 2000))
    }
  })
}

/**
 * Load the select hook (data) with tracks
 * @param t - Translation hook for message
 * @param setData - hook for select
 * @returns {Promise<void>}
 */

export async function handleLoad(t, setData) {
  const auth = require('solid-auth-client');
  auth.trackSession(session => {
    if (!session) {
      return;
    } else {
      /*
        The webId has the structure: https://uo265308.solid.community/profile/card#me
        We want the structure: https://uo265308.solid.community/public/MyRoutes/

        15 == length("profile/card#me")
      */
      let webId = session.webId;
      let urlRouteInPod = webId.slice(0, webId.length - 15).concat("public/MyRoutes/");
      const fc = new FC(auth);
      let routes = [];
      fc.readFolder(urlRouteInPod, null).then((content) => {
        if (content.files.length === 0) {
          NotificationManager.warning(t('routes.loadWarningMessage'), t('routes.loadWarningTitle'), 2000);
        } else {
          for (let i = 0; i < content.files.length; i++) {
            let extension = content.files[i].name.split(".");
            if (!extension[1].localeCompare("json")) {
              routes.push(content.files[i].name.slice(0, content.files[i].name.length - 5));
            }
          }
          NotificationManager.success(t('routes.successLoadMessage'), t('routes.successLoadTitle'), 2000);
          // Hook for select
          setData(routes);
        }
      }).catch(err => console.error("Error:" + err))
    }
  })
}