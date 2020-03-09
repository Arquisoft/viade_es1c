import styled from 'styled-components';
import { Map } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Select } from '@util-components';

export const MapWrapper = styled.section`
  width: 100%;
  background-image: url('/img/background-image.jpg');
  background-repeat: repeat;
  text-align:center;
  position: relative;
`;

export const CenterWrapper = styled.div`
  width: 100%;
`;

export const SelectStyled = styled(Select)`
   width: 10%;
   background: #fff;
`;

export const MapStyled = styled(Map)`
    width: 80%;
    height: 500px;
    display: inline-block;
`;