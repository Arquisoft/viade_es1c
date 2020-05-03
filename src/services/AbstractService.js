import FC from "solid-file-client";
import auth from "solid-auth-client";

export default class AbstractService{

    constructor(){
        this.webId = null;
         /*
            15 == length("profile/card#me")
            "viade/routes/" == folder where the routes are stored
        */
        this.viadeRoute = 15;
        this.errorReadPermission = null;
        this.warning = null;
        this.success = null;
    }

    /**
     * Aux method that return the webId of the user who is logged in.
     * @param {current session} session
     */
    getSessionId(session) {
        if (session !== null) {
            this.webId = session.webId;
        }
        //Si session es null, significa que no existe un contexto, es decir, se está
        //cargando únicamente este componente => test unitarios
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

    /**
     * Aux method that extracts track's name without extension
     * @param {content of readFile} content 
     * @param {extension of file} extension
     * @param {array of tracks} routes
     */
    async getRoutesNames(content, extension, routes) {
        if (content.files.length === 0) {
            this.warning = "No hay contenido";
        } else {
            for (let i = 0; i < content.files.length; i++) {
                extension = content.files[parseInt(i)].name.split(".");
                if (extension[extension.length - 1].localeCompare("json") === 0) {
                    // 5 == length(".json")
                    routes.push(content.files[parseInt(i, 10)].name.slice(0, content.files[parseInt(i, 10)].name.length - 5));
                }
            }
            this.success = "Cargo rutas";
        }
    }
}