import styled from 'styled-components';

export const ShareTrackWrapper = styled.div`
  width: 60%;
  height: 50%;
  padding: 16px;
  margin-top: 16px;
  margin-bottom: 12px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  text-align: left;
  & > h1 {
    margin: 0;
  }
  & > form {
    & > div > .lab {
      width: 80%;
      font-size: 12px;
      font-family: Vegur, 'PT Sans', Verdana, sans-serif;
    }
    & > div > div > Select{
      width: 100%;
      margin-bottom: 2%;
    }
    & > div > label {
      width: 80%;
      font-size: 12px;
      font-family: Vegur, 'PT Sans', Verdana, sans-serif;
    }
    & > div > label > input {
      width: 100%;
      margin-bottom: 3%;
    }
    & > .primera {
      margin-top: 2%;
    }
    & > span {
      font-weight: 700;
    }
`;

export const BtnDiv = styled.div`
  display: flex;
  & > button {
    margin: 0 12px 0 0;
  }
`;

export const Section = styled.section`
  flex: 1 0 auto;
  background-image: url('/img/background-image.jpg');
  background-repeat: repeat;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: relative;
  width: 100vw;

  & .modal-overlay {
    position: absolute;
    background: #fff;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .modal-content {
    position: relative;
    background: rgb(255, 255, 255);
    overflow: hidden;
    outline: none;
    padding: 0 20px;
  }
`;