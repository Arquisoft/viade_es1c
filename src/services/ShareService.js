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
    this.session = null;
    this.webId = null;
    this.urlRouteInOtherPod = null;
  }

  /**
   * Aux method that returns the route to tracks upload in the pod.
   * @param {logged in user's webId} webId
   */
  async getPodRoute(webId){
    this.urlRouteInPod = webId.slice(0, webId.length - 15).concat("public/");
    if (this.HTMLElement != null){
      //let selectedRouteName = this.HTMLElement.value.concat(".json");
      let selectedRouteName = "pru.json";
      this.urlRouteInPod = this.urlRouteInPod.concat(selectedRouteName);
    }
    //await getPodRoute(urlRouteInPod);
  }

  /**
   * Aux method that return the webId of the user who is logged in.
   * @param {current session} session
   */
  async getSessionId(session){
    this.webId = session.webId;
    await this.getPodRoute(this.webId);
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
    //let urlp = url.replace("/card#me", "");
    let perm = false;
    const fc = new FC(auth);
    await fc.readFile(url).then((content) => {
      perm = true;
    }, err => this.error = "Error en el permission".concat(err));
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
              // 5 == length(".json")
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
    await this.getSession();
    const fc = new FC(auth);
    this.content = await fc.readFolder(this.urlRouteInPod, null);
    await this.getRoutesNames(this.content);
  }

  async upload(fc){
    this.urlRouteInOtherPod = "https://miguelornia.solid.community/profile/card#me";
    let permisos = await this.readPermission(this.urlRouteInOtherPod);
    if (permisos === true){
      this.urlRouteInOtherPod = this.urlRouteInOtherPod.replace("profile/card#me", "");
      this.urlRouteInOtherPod = this.urlRouteInOtherPod.concat("public/");
      let selectedRouteName = this.HTMLElement.value.concat("+++.json");
      this.urlRouteInOtherPod = this.urlRouteInOtherPod.concat(selectedRouteName);
      console.log(this.urlRouteInOtherPod);
      try{
        //await fc.createFile(this.urlRouteInOtherPod, this.content, "text/turtle", {});
        await fc.postFile(this.urlRouteInOtherPod, this.content, 'aplication/json');
        console.log("no tuvo problemas en crear");
      } catch (SFCFetchErrorr){
        this.error = "Error en el create";
      }
    }
    /*fc.createFile(urlRouteInPod, fileContent, "text/turtle", {}).then(() => {}
    ).catch(err => );*/
  }

  /**
   * Method that shares the track on the other user pod
   */
  async shareTrack() {
    await this.getSession();
    const fc = new FC(auth);
    this.content = await fc.readFile(this.urlRouteInPod, null);
    await this.upload(fc);
  }
}