import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/css/index.css';
import Home from './Home';
import WeatherAPI from "./WeatherAPI";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  
  const [zip, setZip] = React.useState(null);
  
  return (
    <div className="pageContainer">
      <div className="root">
        <div className="cardcss">
          Search:&nbsp;&nbsp;
          <input 
            type="text" 
            className="zip-input" 
            onChange={(e) => {
              setZip(e.target.value);
            }} 
          />
          <Home zip={zip} />
          <WeatherAPI zip={zip} />
        </div>
      </div>
    </div>
  );
}
export default App;