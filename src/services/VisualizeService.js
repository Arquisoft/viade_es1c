import auth from "solid-auth-client";
import FC from "solid-file-client";
import AbstractService from "./AbstractService";

/*
    *****************************************
    *                                       *
    *   FOLLOWING THE SPECIFICATION V1.1    *
    *                                       *
    * ***************************************
*/

export default class VisualizeService extends AbstractService{

    constructor(){
        super();
        this.points = [];
        this.elevationsValues = [];
        this.urlRouteInPod = null;
        this.routes = [];
        this.extension = null;
        this.session = null;
        this.warning = null;
        this.success = null;
        this.error = null;
        this.errorLoad = false;
        this.existsMultimedia = true;
        this.existsVideo = false;
        this.existsImage = false;
        this.HTMLElement = null;
        this.images = [];
        this.permissionsImage = false;
        this.permissionsVideo = false;
        this.videos = [];
        this.permission = null;
        this.mostrar=true;
    }

    /**
     * Method that returns my tracks stored in pod
     */
    async getMyRoutesFromPod() {
        await this.getPodRoute("viade/routes/");
        const fc = new FC(auth);
        try {
            this.content = await fc.readFolder(this.urlRouteInPod, null);
            await this.getRoutesNames(this.content, this.extension, this.routes);
        } catch (SFCFetchError) {
            this.errorLoad = true;
        }
    }

    /**
     * Method that returns shared tracks stored in pod
     */
    async getSharedRoutesFromPod() {
        await this.getPodRoute("viade/shared/");
        const fc = new FC(auth);
        try {
            this.content = await fc.readFolder(this.urlRouteInPod, null);
            await this.getRoutesNames(this.content, this.extension, this.routes);
        } catch (SFCFetchError) {
            this.errorLoad = true;
        }
    }

    /**
     * Aux method that returns the route to tracks upload in the pod.
     * @param {route in pod} route
     */
    async getPodRoute(route) {
        /*
            15 == length("profile/card#me")
            "viade/routes/" == folder where the routes are stored
        */
        await super.getSession();
        this.urlRouteInPod = this.webId.slice(0, this.webId.length - this.viadeRoute).concat(route);
        if (this.HTMLElement !== null){
            let selectedRouteName = this.HTMLElement.value.concat(".json");
            this.urlRouteInPod = this.urlRouteInPod.concat(selectedRouteName);
        }
    }

    /**
     * Method that assign the points to print the track in the map
     */
    async fillMap(selectedFilter, HTMLElement){
        this.HTMLElement = HTMLElement;
        if (selectedFilter.localeCompare("Mis rutas") === 0) {
            await this.getPodRoute("viade/routes/");
        } else if (selectedFilter.localeCompare("Compartidas") === 0) {
            await this.getPodRoute("viade/shared/");
        }
        const fc = new FC(auth);
        try{
            this.content = await fc.readFile(this.urlRouteInPod, null);
            await this.getPointsToPrint(this.content); 
        } catch (SFCFetchError){
            this.error = "Error al pillar datos";
        }
    }

    /**
     * Aux method to extract points and elevations from track
     * @param {track's content} content 
     */
    async getPointsToPrint(content) {
        let route = JSON.parse(content);
        let latitude = null;
        let longitude = null;
        let elevation = null;
        // We obtain the points of the route
        let numberOfPoints = route.points.length;
        for (let i = 0; i < numberOfPoints; i++) {

            latitude = route.points[parseInt(i, 10)].latitude;
            longitude = route.points[parseInt(i, 10)].longitude;
            this.points.push([latitude, longitude]);

            elevation = route.points[parseInt(i, 10)].elevation;
            this.elevationsValues.push({ x: "P".concat(i+1), y: parseInt(elevation, 10)});
        }
        await this.getMultimedia(route);
    }

    /**
     * Aux method to obtain images from track
     * @param route - track
     * @returns {Promise<void>}
     */
    async getMultimedia(route) {
        // We obtain the images of the track
        let routeMedia = null;
        let extensionRoute = null;
        let extension = null;
        let permissionRoute = null;
        if (typeof(route.media) !== "undefined" && route.media.length > 0) {
                for (let media in route.media) {
                    if (media !== null){
                        routeMedia = route.media[media]["@id"];
                        extensionRoute = routeMedia.split(".");
                        extension = ".".concat(extensionRoute[extensionRoute.length - 1]);
                        if ((extension.localeCompare(".jpg") === 0) || (extension.localeCompare(".png") === 0)
                            || (extension.localeCompare(".jpeg") === 0)) {
                            try {
                                this.existsImage = true;
                                routeMedia.replace("/viade/resources/", "/card#me");
                                permissionRoute = routeMedia;
                                if (await super.readPermission(permissionRoute)){
                                    this.permissionsImage = true;
                                    this.images.push(routeMedia);
                                } else {
                                    this.permissionsImage = false;
                                }
                            } catch (e) {
                                this.permissionsImage = false;
                            }
                        } else if (extension.localeCompare(".mp4") === 0) {
                            try {
                                this.existsVideo = true;
                                routeMedia.replace("/viade/resources/", "/card#me");
                                permissionRoute = routeMedia;
                                if(await super.readPermission(permissionRoute)){
                                    this.permissionsVideo = true;
                                    this.videos.push(routeMedia);
                                } else {
                                    this.permissionsVideo = false;
                                }
                            } catch (e) {
                                this.permissionsVideo = false;
                            }
                        }
                    }
                }
        } else {
            this.existsMultimedia = false;
        }
    }
}