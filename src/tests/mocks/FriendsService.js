export default class FriendsService {

  constructor() {
    this.friends = [];
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
    for (let i = 0; i < this.friends.length; i++) {
      if (this.friends[i].localeCompare(friendWebId) === 0) {
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
      if (this.friends[i].localeCompare(friendWebId) === 0) {
        this.friends.splice(i);
      }
    }
  }
}