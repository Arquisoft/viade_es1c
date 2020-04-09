import React from 'react'
import { render, fireEvent } from "@testing-library/react";
import archivo from '../tracks/rutaDePrueba3';
import UploadTrack from "./../components/containers/uploadTracks/UploadTrack.js";
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';

test("El componente funciona",()=>{
  const div=document.createElement("div");
  ReactDOM.render(<UploadTrack/>,div);
  expect(<UploadTrack/>).toBeTruthy();

});

// test('Prueba', async () => {

//   const div=document.createElement("div");

//   var file = new File([archivo], "rutaPrueba.json", {
//     type: "application/json",
//   });

//   render(<Button id='btnPrueba' onClick={() =>{
//     //handleUploadTest(file);
	
// 	//async function handleUploadTest(file){
//     // let uService = new UploadService();
//     // await uService.processTrack(file);
//     // if (uService.success != null) {
//       // NotificationManager.success(t("upload.successMessage"), t("upload.successTitle"), 2000);
//       // document.getElementById("fileArea").value = ""; // Clear input file
//     // } else if (uService.error != null) {
//       // NotificationManager.error(t("upload.errorMessage"), t("upload.errorTitle"), 3000);
//     // } else if (document.getElementById("fileArea").value === "") {
//       // NotificationManager.error(t("upload.errorEmptyMessage"), t("upload.errorTitle"), 3000);
//     // }
//   // }
//   }}>Prueba</Button>,div);

//   document.getElementById("btnPrueba").click();
  
// });