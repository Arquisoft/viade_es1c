import FC from "solid-file-client";
import auth from "solid-auth-client";

export default class AbstractService{

    constructor(){
        this.webId = null;
        this.viadeRoute = 15;
    }

    /**
     * Aux method that return the webId of the user who is logged in.
     * @param {current session} session
     */
    getSessionId(session) {
        this.webId = session.webId;
    }

    /**
     * Aux method to return the session with it's logged in.
     */
    async getSession(){
        await auth.trackSession((session) => {
        if (!session){
            return;
        } else {
            this.session = session;
        }
        });
        this.getSessionId(this.session);
    }

    /**
     * Aux method to check read permissions
     * @returns {Promise<boolean>}
     */
    async writePermission(url) {
        const fc = new FC(auth);
        url = url.concat("/test.ttl");
        await fc.createFile(url, null);
        await fc.delete(url);
    }
}