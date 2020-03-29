import ldflex from "@solid/query-ldflex";
import FC from "solid-file-client";
import auth from "solid-auth-client";

export default class FriendsService {

  constructor() {
    this.webId = "";
  }

  /**
   * Method that add a new friend
   * @param friendWebId
   * @returns {Promise<void>}
   */
  async add(friendWebId) {
    const auth = require("solid-auth-client");
    await auth.trackSession(session => {
      if (!session) {
        return;
      } else {
        this.webId = session.webId;
      }
    });
    await ldflex[this.webId].knows.add(ldflex[friendWebId]);
  }

  /**
   * Method that remove a friend
   * @param friendWebId
   * @returns {Promise<void>}
   */
  async delete(friendWebId) {
    const auth = require("solid-auth-client");
    await auth.trackSession(session => {
      if (!session) {
        return;
      } else {
        this.webId = session.webId;
      }
    });
    await ldflex[this.webId].knows.delete(ldflex[friendWebId]);
  }

  /**
   * Method that check if a friend exists
   * @param friendWebId
   * @returns {Promise<void>}
   */
  async check(friendWebId) {
    return await this.checkOrigin(friendWebId);
  }

  /**
   * Method that check origin of a webId
   * @param friendWebId
   * @returns {Promise<*>}
   */
  async checkOrigin(friendWebId) {
    return await this.request(async client => await client.itemExists(friendWebId));
  }

  /**
   * Makes a request to the webId
   * @param op
   * @returns {Promise<*>}
   */
  async request(op) {
    try {
      return await op(await this.obtainSessionFc());
    } catch (error) {}
  }

  /**
   * Obtains session (if exists)
   * @returns {Promise<SolidFileClient>}
   */
  async obtainSessionFc() {
    const fc = new FC(auth);
    let session = await auth.currentSession()
    if (!session) {
      session = await auth.login();
    }
    return fc;
  }
}