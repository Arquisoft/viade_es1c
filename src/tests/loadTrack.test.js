import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { Button } from 'react-bootstrap';
import UploadService from '../services/UploadService';

const r1='../tracks/rutaDePrueba3'

var upl=new UploadService();

test('Test login', () => {
  const div=document.createElement("div");
  ReactDOM.render(<Button onClick={upl.handleUpload(r1)}>Prueba</Button>,div);
  //El param pasado al handle debe ser un input, pero no podemos asignar valor por
  //codigo al input
  
  //expect(2+2).toBe(4);
}); 