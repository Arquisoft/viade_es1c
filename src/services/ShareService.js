import auth from "solid-auth-client";
import FC from "solid-file-client";

export default class ShareService {

  constructor(HTMLElement) {
    this.user = null;
    this.friends = [];
    this.error = null;
    this.success = null;
    this.urlRouteInPod = null;
    this.routes = [];
    this.content = null;
    this.HTMLElement = HTMLElement;
  }

  /**
   * Aux method that returns the route to tracks upload in the pod.
   * @param {logged in user's webId} webId
   */
  async getPodRoute(webId){
    this.urlRouteInPod = webId.slice(0, webId.length - 15).concat("public/MyRoutes/");
    if (this.HTMLElement != null){
      let selectedRouteName = this.HTMLElement.value.concat(".json");
      this.urlRouteInPod = this.urlRouteInPod.concat(selectedRouteName);
    }
    //await getPodRoute(urlRouteInPod);
  }

  /**
   * Aux method that return the webId of the user who is logged in.
   * @param {current session} session
   */
  async getSessionId(session){
    let webId = session.webId;
    await this.getPodRoute(webId);
  }

  /**
   * Aux method to return the session with it's logged in.
   */
  async getSession(){
    await auth.trackSession(session => {
      if (!session){
        return;
      } else {
        this.session = session;
      }
    })
    await this.getSessionId(this.session);
  }

  /**
   * Aux method to check permissions over
   * an URL.
   * @param url - url to check
   * @returns {Promise<boolean>} if we have permissions
   * or not
   */
  async readPermission(url) {
    let urlp = url.replace("/card#me", "");
    let perm = false;
    const fc = new FC(auth);
    await fc.readFile(url, null).then((content) => {
      perm = true;
    }, err => this.error = "Error ".concat(err));
    return perm;
  }

  /**
   * Aux method that extracts track's name without extension
   * @param {content of readFile} content
   */
  async getRoutesNames(content) {
    if (content.files.length === 0) {
      this.warning = "No hay contenido";
    } else {
      for (let i = 0; i < content.files.length; i++) {
        this.extension = content.files[i].name.split(".");
        if (!this.extension[1].localeCompare("json")) {
          this.routes.push(content.files[i].name.slice(0, content.files[i].name.length - 5));
        }
      }
      this.success = "Cargo rutas";
    }
  }

  /**
   * Method that returns tracks stored in pod
   */
  async getRoutesFromPod() {
    await this.getSession(null);
    const fc = new FC(auth);
    this.content = await fc.readFolder(this.urlRouteInPod, null);
    await this.getRoutesNames(this.content);
  }
}