import {useLDflexValue, useLDflexList} from '@solid/react';

export default class PodService{
    constructor(){
      this.user = null;
      this.friends = [];
    }

    getUserName(){
      this.user = useLDflexValue('user.firstname') || 'unknown';
    }

    getUserFriends(){
      this.friends = useLDflexList('user.frieds');
    }
}