import auth from "solid-auth-client";
import FC from "solid-file-client";
import ldflex from "@solid/query-ldflex";

export default class ShareService {

  constructor() {
    this.user = null;
    this.friends = [];
    this.error = null;
    this.errorLoad = null;
    this.successShare = false;
    this.warning = false;
    this.success = null;
    this.urlRouteInPod = null;
    this.routes = [];
    this.userFriend = "";
    this.HTMLElement = null;
    this.content = null;
    this.session = null;
    this.webId = null;
    this.urlRouteInOtherPod = null;
    this.urlToCopy = null;
  }

  /**
   * Aux method that returns the route to tracks upload in the pod.
   * @param {logged in user's webId} webId
   */
  async getPodRoute(webId){
    this.urlRouteInPod = webId.slice(0, webId.length - 15).concat("viade/routes/");
    this.urlToCopy = webId.slice(0, webId.length - 15).concat("public/");
    if (this.HTMLElement != null){
      let selectedRouteName = this.HTMLElement.value.concat(".json");
      this.urlRouteInPod = this.urlRouteInPod.concat(selectedRouteName);
      this.urlToCopy = this.urlToCopy.concat(selectedRouteName);
    }
    //await getPodRoute(urlRouteInPod);
  }

  /**
   * Aux method that return the webId of the user who is logged in.
   * @param {current session} session
   */
  async getSessionId(session){
    if (session !== null) {
      this.webId = session.webId;
      await this.getPodRoute(this.webId);
    }
    //Si session es null, significa que no existe un contexto, es decir, se está
    //cargando únicamente este componente => test unitarios
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
    try {
      this.content = await fc.readFolder(this.urlRouteInPod, null);
      await this.getRoutesNames(this.content);
    } catch (SFCFetchError) {
      this.errorLoad = "Error al cargar combo";
    }
  }

  async upload(fc, urlFriendPod){
    if (await fc.itemExists(urlFriendPod) === true){
      let permisos = await this.readPermission(urlFriendPod);
      if (permisos === true){
        let selectedRouteName = this.HTMLElement.value.concat("");
        this.urlRouteInOtherPod = urlFriendPod.concat(selectedRouteName);
        if (await fc.itemExists(this.urlRouteInOtherPod.concat(".json")) === false){
          try{
            await fc.postFile(this.urlRouteInOtherPod, this.content, 'application/json');
            this.successShare = true;
          } catch (SFCFetchError){
            this.error = "Error en el create";
          } 
        } else {
          this.warning = true;
        }
      } else {
        this.error = "Permisos denegados";
      }
    } else {
      this.error = "Carpeta no encontrada";
    }
    
  }

  /**
   * Aux method to delete the copy of the track made to share it.
   * @param {file-client instance} fc 
   */
  async removeCopiedTrack(fc){
    try{
      await fc.delete(this.urlToCopy);
    } catch (err){
      if (err.status === 409 || err.status === 301){
        this.error = "Esta borrando una carpeta";
      } else if (err.status === 404){
        this.error = "No existe el fichero a borrar";
      } else {
        this.error = "Otro error";
      }
    }
  }

  /**
   * Method that shares the track on the other user pod
   */
  async shareTrack(userFriend, HTMLElement) {
    this.userFriend = userFriend;
    this.HTMLElement = HTMLElement;
    await this.getSession();
    const fc = new FC(auth);
    this.content = await fc.readFile(this.urlRouteInPod, null);
    //**copy track file at public carpet**
    await fc.createFile(this.urlToCopy, this.content, "text/turtle", {});
    //**share track to selected friend**
    /*for (let i = 0; i < this.userFriends.length ; i++){
      let urlFriendPod = this.userFriends[i].slice(0, this.userFriends[i].length - 15).concat("public/share/");
      await this.upload(fc, urlFriendPod);
    }*/
    let urlFriendPod = this.userFriend.slice(0, this.userFriend.length - 15).concat("public/share/");
    await this.upload(fc, urlFriendPod);
    //**delete copy file**/
    await this.removeCopiedTrack(fc);
  }

  /**
   * Returns user name
   * @param userWebId
   * @returns {Promise<*>}
   */
  async getName(userWebId) {
    return await ldflex[userWebId].name
  }
}