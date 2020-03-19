import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from "./components/routes/Routes";
import MyNavBar from "./components/containers/navBar/NavBar";

function App() {
  return (
    <div className="App">
        <MyNavBar></MyNavBar>
        <Routes/>
    </div>
  );
}

export default App;
