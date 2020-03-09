import styled from 'styled-components';
import { Map } from "react-leaflet";
import 'leaflet/dist/leaflet.css';


export const MapWrapper = styled.section`
  width: 100%;
  background-image: url('/img/background-image.jpg');
  background-repeat: repeat;
  text-align:center;
`;

export const MapStyled = styled(Map)`
    width: 80%;
    height: 500px;
    display: inline-block;
  `;