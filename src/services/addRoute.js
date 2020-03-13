import { fetchDocument } from 'tripledoc';

const auth = require('solid-auth-client')

export async function addRoute(routeToAdd) {
    let session = await auth.currentSession();
    if (!session) { 
        window.location.href = "/login"; 
    }
    const dir = 'private/routes/' + routeToAdd.nombre + '.tll';
    const webId = session.webId;
    
    await newDocument(webId, dir);

}

async function newDocument(webId, dir) {

    const profileDocument = await fetchDocument(webId);
    const profile = profileDocument.getSubject(webId);


    const storage = profile.getRef(space.storage);


    const routesListRef = storage + dir;

    const routesList = createDocument(routesListRef);
    await routesList.save();
}