/**
 * Simulating access to POD and share tracks
 */
export default class ShareService {

  constructor() {
    this.error = "";
    this.errorLoad = null;
    this.successShare = true;
    this.warning = true;
    this.success = "";
    this.sharedPreviosuly = "https://es1c.solid.community/profile/card#me";
    this.failCreate = "https://uo265308.inrupt.net/profile/card#me";
    this.permissionsProblem = "https://sandracast.solid.community/profile/card#me";
    this.folderError = "https://raquel.solid.community/profile/card#me";
  }

  shareTrack(friend, HTMLElement) {
    if (friend.localeCompare(this.sharedPreviosuly) === 0) {
      this.warning = true;
      this.success = false;
    } else if (friend.localeCompare(this.failCreate) === 0) {
      this.warning = false;
      this.success = false;
      this.error = "Error en el create";
    } else if (friend.localeCompare(this.permissionsProblem) === 0) {
      this.warning = false;
      this.success = false;
      this.error = "Permisos denegados";
    } else if (friend.localeCompare(this.folderError) === 0) {
      this.warning = false;
      this.success = false;
      this.error = "Carpeta no encontrada";
    }
  }

  getRoutesFromPod() {
    this.routes = ["Ruta1"];
  }
  
  getName(userWebId) {
    return "Miguel";
  }
}