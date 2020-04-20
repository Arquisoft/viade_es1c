/**
 * Simulating access to POD and groups of friends
 */
export default class FriendGroupService {

  constructor() {
    this.groupsNames = [];
    this.errorLoad = null;
    this.groupFriends = [];
  }

  getGroups() {
    this.groupsNames = ["Montaneros"];
  }

  getFriendsWebIds(group) {
    this.groupFriends = ["https://miguelornia.inrupt.net/profile/card#me"];
  }
}