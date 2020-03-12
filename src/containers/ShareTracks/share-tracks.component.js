import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { namedNode } from '@rdfjs/data-model';
import { AccessControlList, NotificationTypes } from '@inrupt/solid-react-components';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import {
  ldflexHelper,
  errorToaster,
  successToaster,
  storageHelper,
  notification as helperNotification
} from '@utils';
import { ShareTrackWrapper, BtnDiv , StyledSelect, Section } from './share-tracks.style';
import { Select } from '@util-components';

type Props = {
  webId: String,
  sendNotification: () => void,
  contact: string,
  setContact: () => void
};

const data = ['Ruta1', 'Ruta2', 'Ruta3'];

const ShareTrack = ({ webId, sendNotification, contact, setContact }: Props) => {
  const uniqueIdentifier = Date.now();
  const [documentUri, setDocumentUri] = useState(`${uniqueIdentifier}.ttl`);
  const { t } = useTranslation();

  const reset = () => {
    setDocumentUri('');
    setContact('');
  };

  const deshabilita = () =>{
    alert(t('alert.message'));
  };

  /**
   * Creates the initial game object based on the contact's webId
   * @param {String} contact contact's webId
   * @returns {Object} Game data
   */
  const initialGame = contact => ({
    status: 'Invite Sent',
    created: moment().format(),
    actor: namedNode(webId),
    contact: namedNode(contact),
    initialState: 'X',
    move: ''
  });

  /**
   * Creates a game with the initial game object and sends a notification to the rival
   * @param {String} documentUri Game document's url
   * @param {String} contact Opponent's webId
   */
  const createGame = async (documentUri: String, contact: String) => {
    try {
      /**
       * Get full contact game path
       */
      const appPath = await storageHelper.getAppStorage(contact);
      const gameSettings = `${appPath}settings.ttl`;
      const licenseUrl = 'https://creativecommons.org/licenses/by-sa/4.0/';
      /**
       * Find contact inboxes from a document link
       */
      const inboxes = await helperNotification.findUserInboxes([
        { path: contact, name: 'Global' },
        { path: gameSettings, name: 'Game' }
      ]);
      /**
       * If contact has at least one inbox, create a game and send a notification
       * Otherwise, show an error message
       * */
      if (inboxes.length > 0) {
        const newDocument = await ldflexHelper.createNonExistentDocument(documentUri);

        /**
         * If game already exist show an error message
         */
        if (!newDocument) {
          errorToaster(`${documentUri} ${t('game.alreadyExists')}`, t('notifications.error'));
          return null;
        }

        /**
         * If document was created we will initialize the game, otherwise show an error
         */
        if (newDocument.ok) {
          const document = await ldflexHelper.fetchLdflexDocument(documentUri);
          const setupObj = initialGame(contact);

          for await (const field of tictactoeShape.shape) {
            const prefix = tictactoeShape['@context'][field.prefix];
            const predicate = `${prefix}${field.predicate}`;
            const obj = setupObj[field.predicate];
            if (obj || obj === '') await document[predicate].add(obj);
          }
          /**
           * Find the contact's game-specific inbox. If it doesn't exist, get the global inbox instead
           * @to: contact inbox path
           */
          const to = helperNotification.getDefaultInbox(inboxes, 'Game', 'Global');
          const target = `${window.location.href}/${btoa(documentUri)}`;
          await sendNotification(
            {
              title: 'Tictactoe invitation',
              summary: 'has invited you to play Tic-Tac-Toe.',
              actor: webId,
              object: documentUri,
              target
            },
            to.path,
            NotificationTypes.INVITE,
            licenseUrl
          );

          setDocumentUri(`${Date.now()}.ttl`);

          return true;
        }
        errorToaster(`${contact} ${t('game.createFolder.message')}`, t('notifications.error'));
        return null;
      }

      errorToaster(`${contact} ${t('noInboxOpponent.message')}`, t('notifications.error'), {
        label: t('noInboxOpponent.link.label'),
        href: t('noInboxOpponent.link.href')
      });

      return null;
    } catch (e) {
      errorToaster(e.message, t('notifications.error'));
    }
  };

  /**
   * Creates a new game based on an contact's webId and a game document url with an acl file
   * @param {Event} e Submit event
   */
  const onSubmit = async e => {
    try {
      e.preventDefault();
      const appPath = await storageHelper.getAppStorage(webId);
      const documentPath = `${appPath}${documentUri}`;

      if (!contact || contact === '') {
        errorToaster(t('game.opponentMissing'), t('game.errorTitle'));
        return;
      }

      if (webId === contact) {
        errorToaster(t('game.myself'), t('game.errorTitle'));
        return;
      }

      const result = await createGame(documentPath, contact);

      if (result) {
        const permissions = [
          {
            agents: [contact],
            modes: [AccessControlList.MODES.READ, AccessControlList.MODES.WRITE]
          }
        ];
        const ACLFile = new AccessControlList(webId, documentPath);
        await ACLFile.createACL(permissions);
        successToaster(t('game.createGameSuccess'), t('notifications.success'));
      }
    } catch (e) {
      errorToaster(e.message, t('game.errorTitle'));
    }
  };

  return (
    <Section>
      <ShareTrackWrapper onSubmit={deshabilita} data-testid="game-form">
        <h1>{t('share.title')}</h1>
        <hr />
        <form>
          <span>{t('share.createSharePrompt')}</span>
          <div className="primera">
            <label className="lab" htmlFor="documentUriInput">
              {t('share.idLabel')}
            </label>
            <Select className="sel" options = {data}/>
          </div>
          <div>
            <label htmlFor="opponentWebId">
              {t('share.contactWebIDLabel')}
              <input
                id="opponentWebId"
                type="text"
                value={contact}
                onChange={e => setContact(e.target.value)}
                data-testid="webId"
              />
            </label>
          </div>
          <BtnDiv>
            <button type="submit" data-testid="form-submit" >
              {t('share.shareTrack')}
            </button>
            <button type="button" onClick={reset}>
              {t('share.resetShareForm')}
            </button>
          </BtnDiv>
        </form>
      </ShareTrackWrapper>
    </Section>
  );
};

export default ShareTrack;