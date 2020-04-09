import React from 'react';
import { render, queryByTestId, act } from '@testing-library/react';
import VisualizeTrack from '../components/containers/visualizeTracks/VisualizeTrack';
import ReactDOM from 'react-dom';

test('Prueba de visualize',()=>{
  const div=document.createElement("div");
  ReactDOM.render(<VisualizeTrack/>,div);
  expect(<VisualizeTrack/>).toBeTruthy();
});
