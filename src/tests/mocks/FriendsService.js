/**
 * Simulating access to POD and SOLID friends
 */
export default class FriendsService {

  constructor() {
    this.friends = [];
    this.existsWebId = ["https://miguelornia.inrupt.net/profile/card#me"];
  }

  check(friendWebId) {
    for (let i = 0; i < this.friends.length; i++) {
      if (this.friends[i].localeCompare(friendWebId) === 0) {
        return true;
      }
    }
    return false;
  }

  exists(friendWebId) {
    for (let i = 0; i < this.existsWebId.length; i++) {
      if (this.existsWebId[i].localeCompare(friendWebId) === 0) {
        return true;
      }
    }
    return false;
  }

  add(friendWebId) {
    this.friends.push(friendWebId);
  }

  delete(friendWebId) {
    for (let i = 0; i < this.friends.length; i++) {
      if (this.friends[parseInt(i)].localeCompare(friendWebId) === 0) {
        this.friends.splice(i);
      }
    }
  }
}