import auth from 'solid-auth-client';
import FC from 'solid-file-client';

export default class VisualizeService{
    constructor(){
        this.points = [];
        this.elevationsValues = [];
        this.urlRouteInPod = null;
        this.routes = [];
        this.extension = null;
        this.session = null;
        this.warning = null;
        this.success = null;
        this.error = null;
    }

    /**
     * Aux method that returns the route to tracks upload in the pod.
     * @param {} webId 
     * @param {*} HTMLElement 
     */
    async getPodRoute(webId, HTMLElement){
        this.urlRouteInPod = webId.slice(0, webId.length - 15).concat("public/MyRoutes/");
        if (HTMLElement != null){
            let selectedRouteName = HTMLElement.value.concat(".json");
            this.urlRouteInPod = this.urlRouteInPod.concat(selectedRouteName);
        }
        //await getPodRoute(urlRouteInPod);
    }

    /**
     * Aux method that return the webId of the user who is logged in.
     * @param {} session 
     * @param {*} HTMLElement 
     */
    async getSessionId(session, HTMLElement){
        let webId = session.webId;
        await this.getPodRoute(webId, HTMLElement);
    }

    /**
     * Aux method to return the session with it's logged in.
     * @param {*} HTMLElement 
     */
    async getSession(HTMLElement){
        await auth.trackSession(session => {
            if (!session){
                return;
            } else {
                this.session = session;
            }
        })
        await this.getSessionId(this.session, HTMLElement);
    }

    /**
     * Aux method that extracts track's name without extension
     * @param {content of readFile} content 
     */
    async getRoutesNames(content){
        if (content.files.length === 0) {
            this.warning = "No hay contenido";
        } else {
            for (let i = 0; i < content.files.length; i++) {
                this.extension = content.files[i].name.split(".");
                if (!this.extension[1].localeCompare("json")) {
                    this.routes.push(content.files[i].name.slice(0, content.files[i].name.length - 5));
                }
            }
            this.success = "Cargo rutas";
        }
    }

    /**
     * Method that returns tracks stored in pod
     */
    async getRoutesFromPod(){
        await this.getSession(null);
        const fc = new FC(auth);
        this.content = await fc.readFolder(this.urlRouteInPod, null);
        await this.getRoutesNames(this.content);
    }

    /**
     * Aux method to extract points and elevations from track
     * @param {track's content} content 
     */
    async getPointsToPrint(content){
        // We obtain the JSON file from the pod
        let route = JSON.parse(content);
    
        // We obtain the points of the route
        for (let i = 0; i < route.itinerary.numberOfItems; i++) {
            let latitude = route.itinerary.itemListElement[i].item.latitude;
            let longitude = route.itinerary.itemListElement[i].item.longitude;
            let elevationValue = route.itinerary.itemListElement[i].item.elevation.split(" ");
            this.elevationsValues.push({ x: 'P'.concat(i+1), y: parseInt(elevationValue[0], 10)});
            this.points.push([latitude, longitude]);
        }
    }

    /**
     * Method that assign the points to print the track in the map
     * @param {route selected at combo} HTMLElement 
     */
    async fillMap(HTMLElement){
        await this.getSession(HTMLElement);
        const fc = new FC(auth);
        try{
            this.content = await fc.readFile(this.urlRouteInPod, null);
            console.log(this.content);
            await this.getPointsToPrint(this.content); 
        } catch (SFCFetchError){
            this.error = "Error al pillar datos";
        }
    }
}