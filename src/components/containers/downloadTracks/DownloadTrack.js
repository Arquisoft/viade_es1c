import React from "react";
import { useTranslation } from "react-i18next";
import {NotificationContainer} from "react-notifications";
import { Button } from 'react-bootstrap';


export const DownloadTrack = props => {
    const { t } = useTranslation();
    return(
        <section>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>{t('download.title')}</h2>
                    </div>
                    <div className="modal-body">
                        <h4>{t('download.instruction')}</h4>
                        <input type="text"></input>
                    </div>
                    <div className="modal-footer">
                        <Button> {t('download.button')}</Button>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        </section>
    );

}

export default DownloadTrack;