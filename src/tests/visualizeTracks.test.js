import React from 'react';
import { render, queryByTestId, act } from '@testing-library/react';
import VisualizeTrack from '../components/containers/visualizeTracks/VisualizeTrack';

// describe('Visualize Map', () => {
//   afterAll(cleanup);

//   // const { container } = render(
//   //     <VisualizeTrack/>
//   // );

//   jest.mock('react-i18next', () => ({
//     useTranslation: () => ({t: container => container=render(
//       <VisualizeTrack/>
//   )})
//   }));
//   test('App renders without crashing', () => {
//     expect(container).toBeTruthy();
//   });
// });
let wrapper;
beforeEach(() => act(() => {
  const {container}=render(<VisualizeTrack/>);
  wrapper = container;

}

));


describe('Visualize Map',()=>{
  
  
  test('App renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
