import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { Button } from 'react-bootstrap';
import UploadService from '../services/UploadService';
import archivo from '../tracks/rutaDePrueba3';

const fs = require('fs');

var r1='../tracks/rutaDePrueba3.json'

var upl=new UploadService();

test('Test login', () => {
  const div=document.createElement("div");

  var file = new File([archivo], "rutaPrueba.json", {
    type: "text/turtle",
  });

  ReactDOM.render(<Button onClick={() =>{
    upl.processTrack(file);
  }}>Prueba</Button>,div);
 
  console.log(file.name);
  let fd;
  
  //expect(2+2).toBe(4);
}); 

() =>{

};