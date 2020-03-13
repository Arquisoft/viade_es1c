import React from "react";
import { UploadWrapper, H1, MyInput,Button } from './upload.style';
import { useTranslation } from "react-i18next";

class uploadToPost{
	
	constructor(fetch) {
        this.fetch = fetch;
    }
	
	 executeSPARQLUpdateForUser(url, query) {
        return this.fetch(url, {
            method: "POST",
            body: query,
            headers: {
                "Content-Type": "text/plain"
            }
        });
    }

}
export default UploadComponent;