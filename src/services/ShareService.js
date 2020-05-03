import auth from "solid-auth-client";
import FC from "solid-file-client";
import ldflex from "@solid/query-ldflex";
import AbstractService from "./AbstractService";

export default class ShareService extends AbstractService{

  constructor() {
    super();
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
   */
  async getPodRoute(){
    await super.getSession();
    this.urlRouteInPod = this.webId.slice(0, this.webId.length - this.viadeRoute).concat("viade/routes/");
    this.urlToCopy = this.webId.slice(0, this.webId.length - this.viadeRoute).concat("public/");
    if (this.HTMLElement !== null){
      let selectedRouteName = this.HTMLElement.value.concat(".json");
      this.urlRouteInPod = this.urlRouteInPod.concat(selectedRouteName);
      this.urlToCopy = this.urlToCopy.concat(selectedRouteName);
    }
    //await getPodRoute(urlRouteInPod);
  }

  /**
   * Method that returns tracks stored in pod
   */
  async getRoutesFromPod() {
    await this.getPodRoute();
    const fc = new FC(auth);
    try {
      this.content = await fc.readFolder(this.urlRouteInPod, null);
      await this.getRoutesNames(this.content, this.extension, this.routes);
    } catch (SFCFetchError) {
      this.errorLoad = "Error al cargar combo";
    }
  }

  async upload(fc, urlFriendPod){
    try {
      if (await fc.itemExists(urlFriendPod) === true){
        let permisos = await super.readPermission(urlFriendPod);
        if (permisos === true){
          let selectedRouteName = this.HTMLElement.value.concat("");
          this.urlRouteInOtherPod = urlFriendPod.concat(selectedRouteName);
          if (await fc.itemExists(this.urlRouteInOtherPod.concat(".json")) === false){
            try{
              await fc.postFile(this.urlRouteInOtherPod, this.content, "application/json");
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
    } catch (SFCFetchError) {
      this.error = "Permisos denegados";
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
    await this.getPodRoute();
    const fc = new FC(auth);
    this.content = await fc.readFile(this.urlRouteInPod, null);
    //**copy track file at public carpet**
    try {
      await fc.createFile(this.urlToCopy, this.content, "text/turtle", {});
    } catch (e) {
      this.error = "Mis permisos fallan";
      return;
    }
    //**create file at friends pod**
    let urlFriendPod = this.userFriend.slice(0, this.userFriend.length - this.viadeRoute).concat("viade/shared/");
    await this.upload(fc, urlFriendPod);
    //**delete copy file**
    await this.removeCopiedTrack(fc);
  }

  /**
   * Returns user name
   * @param userWebId
   * @returns {Promise<*>}
   */
  async getName(userWebId) {
    return await ldflex[userWebId].name;
  }
}