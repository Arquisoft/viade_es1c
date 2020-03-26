import auth from 'solid-auth-client';

export default class ShareService{
    constructor(){
        this.user = null;
        this.friends = [];
    }

    /**
     * Aux method that return logged user's webId.
     * @param {current session} session 
     * @param {null or combobox at visualize} HTMLElement 
     */
    async getSessionId(session){
      this.user = session.webId;
    }

    /**
     * Aux method to return the session with it's logged in.
     * @param {null or combobox at visualize} HTMLElement 
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
}