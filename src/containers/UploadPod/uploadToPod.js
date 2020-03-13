import React from "react";
import { UploadWrapper, H1, MyInput,Button } from './upload.style';
import { useTranslation } from "react-i18next";

export class UploadToPod{
	
	constructor(fetch) {
        this.fetch = fetch;
    }
	
	 executeSPARQLUpdateForUser(url, query) {
        return this.fetch(url, {
            //method: "POST",
			method: "PUT",
            body: query,
            headers: {
                "Content-Type": "text/plain"
            }
        });
    }

}
export default UploadToPod;