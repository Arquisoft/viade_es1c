import React from "react";

const auth = require('solid-auth-cli')
const FC   = require('solid-file-client')
const fc   = new FC( auth )

async function run(){
    let session = await auth.currentSession()
    if (!session) { session = await auth.login() }
    console.log(`Logged in as ${session.webId}.`)


    //if( await fc.itemExists( someUrl ) {
        //let content = await fc.readFile( someUrl )
        // ... other file methods
        // ... and/or other auth methods
    //}
}
