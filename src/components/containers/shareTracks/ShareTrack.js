import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Select} from '../../utils/select/Select';
import {Button} from "react-bootstrap";
import {NotificationContainer} from "react-notifications";
import "./ShareTrack.css";

type
Props = {
    webId: String,
    sendNotification: () => void,
    contact: string,
    setContact: () => void
};

const data = ['Ruta1', 'Ruta2', 'Ruta3'];

const ShareTrack = ({webId, sendNotification, contact, setContact}: Props) => {
    const uniqueIdentifier = Date.now();
    const [documentUri, setDocumentUri] = useState(`${uniqueIdentifier}.ttl`);
    const {t} = useTranslation();

    const reset = () => {
        deshabilita();
        setDocumentUri('');
        //setContact('');
    };

    const deshabilita = () => {
        alert(t('alert.message'));
    };

    /**
     * --- NEED TO BE CHANGE ---
     */
    const onSubmit = async e => {
        try {
            e.preventDefault();

            if (!contact || contact === '') {
                return;
            }

            if (webId === contact) {
                return;
            }

        } catch (e) {
        }
    };

    return (
        <section>
            <div className="modal-dialog">
                <div onSubmit={deshabilita} className="modal-content">
                    <div className="modal-header">
                        <h2>{t('share.title')}</h2>
                        <hr/>
                    </div>
                    <form className="modal-body">
                        <span>{t('share.createSharePrompt')}</span>
                        <div className="primera">
                            <label className="lab" htmlFor="documentUriInput">
                                {t('share.idLabel')}
                            </label>
                            <Select className="sel" options={data}/>
                        </div>
                        <div>
                            <label>
                                {t('share.contactWebIDLabel')}
                                <input className="correct-margin"
                                    id="opponentWebId"
                                    type="text"
                                    value={contact}
                                    onChange={e => setContact(e.target.value)}
                                    data-testid="webId"
                                />
                            </label>
                        </div>
                        <div>
                            <Button className="correct-margin" type="submit" data-testid="form-submit">
                                {t('share.shareTrack')}
                            </Button>
                            <Button className="correct-margin" onClick={reset}>
                                {t('share.resetShareForm')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <NotificationContainer/>
        </section>
    )
        ;
};

export default ShareTrack;