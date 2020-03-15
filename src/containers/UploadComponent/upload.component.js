import React from "react";
import { UploadTrackWrapper, H1, MyInput, Button, Section } from "./upload.style";
import { useTranslation } from "react-i18next";
import FC from "solid-file-client";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from "react-notifications";

export const UploadComponent = props => {

  // Locales for i18n
  const { t } = useTranslation();

  /**
   * Process the case of an individual item
   * @param item
   * @returns {Promise<void>}
   */

  async function processItem(item) {
    let reader = new FileReader();
    let nameFile = item.name;
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
          fc.createFile(urlRouteInPod, fileContent, "text/turtle", {}).then((content) => {

            NotificationManager.success(t("upload.successMessage"), t("upload.successTitle"));
          })
            .catch(err => console.error(`Error: ${err}`));
        }
      });
    };
    reader.readAsText(item);
  }

  /**
   * Process the case of an array
   * @param array
   * @returns {Promise<void>}
   */

  async function processArray(array) {
    array.forEach(async (item) => {
      await processItem(item);
    });
  }

  /**
   * Perform multiple upload
   * @returns {Promise<void>}
   */

  async function upload() {
    const fileInput = document.getElementById("fileArea");
    const files = fileInput.files;
    await processArray(files);
  }

  return (
    <Section>
      <UploadTrackWrapper>
        <H1>{t("upload.title")}</H1>
        <hr/>
        <span>{t("upload.uploadPrompt")}</span>
        <MyInput type="file" id="fileArea" multiple/>
        <Button onClick={upload}>
          {t("upload.button")}
        </Button>
        <NotificationContainer/>
      </UploadTrackWrapper>
    </Section>
  );
};

export default UploadComponent;