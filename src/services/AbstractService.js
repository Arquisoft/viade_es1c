import FC from "solid-file-client";
import auth from "solid-auth-client";

export default class AbstractService{

    constructor(){
        this.webId = null;
        this.viadeRoute = 15;
        this.errorReadPermission = null;
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
        }, (err) => this.errorReadPermission = "Error en el permission".concat(err));
        return perm;
    }
}