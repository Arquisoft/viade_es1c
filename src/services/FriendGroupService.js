import FC from "solid-file-client";
import auth from "solid-auth-client";
import AbstractService from "./AbstractService";

/*
    *****************************************
    *                                       *
    *   FOLLOWING THE SPECIFICATION V1.1    *
    *                                       *
    * ***************************************
*/

export default class FriendGroupService extends AbstractService{

  constructor() {
    super();
    this.groupName = null;
    this.urlRouteInPod = "";
    this.groupJsonContent = "";
    this.success = false;
    this.folderContent = null;
    this.warning = false;
    this.groupsNames = [];
    this.errorLoad = null;
    this.groupFriends = [];
    this.content = "";
  }

  /**
   * Aux method that returns the route to groups upload in the pod.
   */
  async getPodRoute() {
    /*
        15 == length("profile/card#me")
        "viade/groups/" == folder where the groups are stored
    */
    await super.getSession();
    this.urlRouteInPod = this.webId.slice(0, this.webId.length - this.viadeRoute).concat("viade/groups/");
    if (this.groupName !== null){
      let name = this.groupName.concat(".json");
      this.urlRouteInPod = this.urlRouteInPod.concat(name);
    }
  }


  /**
   * Creates the jsonld for group
   * @param friendsWebIds
   */
  generateJsonld(friendsWebIds) {
    // Directives from jsonld file
    let jsonld = {"@context" :
          {"@version" : 1.1,
            "users" : {"@container": "@list", "@id": "schema:Person"},
            "name": { "@id": "schema:name", "@type": "xs:string" },
            "url": { "@id": "schema:url", "@type": "xs:string" },
            "schema": "http://schema.org/",
            "xsd": "http://www.w3.org/2001/XMLSchema#"
          }};
    // Content of jsonld
    jsonld["name"] = this.groupName;
    let group = [];
    for (let i = 0; i < friendsWebIds.length; i++) {
        group.push({"url" : friendsWebIds[parseInt(i)]});
    }
    jsonld["users"] = group;
    this.groupJsonContent = JSON.stringify(jsonld);
  }

  /**
   * Creates a group in POD
   * @param friendGroup
   * @param friendsWebIds
   * @returns {Promise<void>}
   */
  async create(friendGroup, friendsWebIds) {
    this.groupName = friendGroup;
    await this.getPodRoute();
    this.generateJsonld(friendsWebIds);
    const fc = new FC(auth);
    try {
      await fc.createFile(this.urlRouteInPod, this.groupJsonContent, "text/turtle", {});
      this.success = true;
    } catch(e) {
      this.success = false;
    }
  }

  /**
   * Returns groups stored in POD
   */
  async getGroups(){
    await this.getPodRoute();
    const fc = new FC(auth);
    try{
      this.folderContent = await fc.readFolder(this.urlRouteInPod, null);
      if (this.folderContent.length === 0){
        this.warning = "No hay grupos";
      } else {
        for (let i = 0; i < this.folderContent.files.length; i++) {
          this.groupsNames.push(this.folderContent.files[parseInt(i)].name.slice(0, this.folderContent.files[parseInt(i)].name.length - 5));
        }
      }
    } catch(SFCFetchError){
      this.errorLoad = "Error al cargar lista de grupos";
    }
  }

  /**
   * Obtains webId of my friends
   * @returns {Promise<void>}
   */
  async obtainUrls() {
    let group = JSON.parse(this.content);
    // We obtain the webIds of the group
    let users = group.users.length;
    for (let i = 0; i < users; i++) {
      let friend = group.users[parseInt(i, 10)].url;
      this.groupFriends.push(friend);
    }
  }

  /**
   * Get my friends WebIds from POD
   * @param group
   * @returns {Promise<void>}
   */
  async getFriendsWebIds(group) {
    await this.getPodRoute();
    let url = this.urlRouteInPod.concat(group).concat(".json");
    const fc = new FC(auth);
    this.content = await fc.readFile(url, null);
    await this.obtainUrls();
  }
}