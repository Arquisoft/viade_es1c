import ldflex from "@solid/query-ldflex";
import FC from "solid-file-client";
import auth from "solid-auth-client";

export default class FriendsService {

  constructor() {
    this.webId = "";
    this.errorAdd = false;
    this.errorDelete = false;
  }

  /**
   * Method that add a new friend
   * @param friendWebId
   * @returns {Promise<void>}
   */
  async add(friendWebId) {
    const auth = require("solid-auth-client");
    await auth.trackSession((session) => {
      if (!session) {
        return;
      } else {
        this.webId = session.webId;
      }
    });
    try {
      await ldflex[this.webId].knows.add(ldflex[friendWebId]);
    } catch (e) {
      this.errorAdd = true;
    }
  }

  /**
   * Method that remove a friend
   * @param friendWebId
   * @returns {Promise<void>}
   */
  async delete(friendWebId) {
    const auth = require("solid-auth-client");
    await auth.trackSession((session) => {
      if (!session) {
        return;
      } else {
        this.webId = session.webId;
      }
    });
    try {
      await ldflex[this.webId].knows.delete(ldflex[friendWebId]);
    } catch(e) {
      this.errorDelete = true;
    }
  }

  /**
   * Method that check if it's already a friend
   * @param friendWebId
   * @returns {Promise<void>}
   */
  async check(friendWebId) {
    const auth = require("solid-auth-client");
    await auth.trackSession((session) => {
      if (!session) {
        return;
      } else {
        this.webId = session.webId;
      }
    });
    for await (const friend of ldflex[this.webId].friends) {
      if (String(friend).localeCompare(String(friendWebId)) === 0) {
        return await true;
      }
    }
    return await false;
  }

  /**
   * Method that check if a friend exists
   * @param friendWebId
   * @returns {Promise<void>}
   */
  async exists(friendWebId) {
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
    } catch (error) {
      throw new Error("failed requesto to the webId");
    }
  }

  /**
   * Obtains session (if exists)
   * @returns {Promise<SolidFileClient>}
   */
  async obtainSessionFc() {
    const fc = new FC(auth);
    let session = await auth.currentSession();
    if (!session) {
      session = await auth.login();
    }
    return fc;
  }
}