import FC from "solid-file-client";
import auth from "solid-auth-client";

/*
    *****************************************
    *                                       *
    *   FOLLOWING THE SPECIFICATION V1.1    *
    *                                       *
    * ***************************************
*/

export default class NotificationsService {

  constructor() {
    this.error = false;
  }

  /**
   * Checks inbox status
   * @param path
   * @returns {Promise<boolean>}
   */
  async checkContent(path) {
    await auth.trackSession((session) => {
      if (!session){
        return;
      } else {
        this.session = session;
      }
    });
    const fc = new FC(auth);
    try {
      let content = await fc.readFolder(path, null);
      for (let i = 0; i < content.files.length; i++) {
        this.extension = content.files[i].name.split(".");
        if (this.extension[this.extension.length - 1].localeCompare("ttl") === 0) {
          let file = await fc.readFile(path.concat(content.files[i].name), null);
          let fileContent = String(file);
          if (fileContent.includes("summary")) {
            return true;
          }
        }
      }
      return false;
    } catch (e) {
      this.error = true;
    }
  }
}