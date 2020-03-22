import React from "react";
import { useTranslation } from "react-i18next";
import FC from "solid-file-client";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from "react-notifications";
import { Button } from 'react-bootstrap';
import "./UploadTrack.css";
import LoggedIn from "@solid/react/module/components/LoggedIn";
import LoggedOut from "@solid/react/module/components/LoggedOut";
import { Redirect } from "react-router-dom";

export const UploadTrack = props => {

    // Locales for i18n
    const { t } = useTranslation();
    let times = 0; // For success message

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
                        if (times === 0) {
                            NotificationManager.success(t("upload.successMessage"), t("upload.successTitle"));
                            document.getElementById("fileArea").value = ""; // Clear input file
                            times++;
                        }
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
        <section>
            <LoggedIn>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>{t("upload.title")}</h2>
                    </div>
                    <div className="modal-body">
                        <span>{t("upload.uploadPrompt")}</span>
                        <input type="file" id="fileArea" multiple/>
                    </div>
                    <div className="modal-footer">
                        <Button onClick={upload}>
                            {t("upload.button")}
                        </Button>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
            </LoggedIn>
            <LoggedOut>
                <Redirect to="/"></Redirect>
            </LoggedOut>
        </section>
    );
};

export default UploadTrack;