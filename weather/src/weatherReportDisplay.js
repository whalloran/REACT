import React from "react";
import './App.css';
import raindrop from './img/raindrop.png';
// import sunny from './img/sunny_icon.jpg';
// import light_rain from './img/light_rain_icon.jpg';
// import heavy_rain from './img/heavy_rain_icon.jpg';
// import overcast from './img/overcast_icon.jpg';
// import snow from './img/snow_icon.jpg';
// import clear from './img/clear_icon.png';

// Date and Time
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const today = new Date();
const dayNum = today.getDay();
const monthNum = today.getMonth();
const day = days[dayNum];
const month = months[monthNum];
const date = today.getDate();
const year = today.getFullYear();
const hour = today.getHours();

// Display Current Weather
const Display = ({ weatherReport }) => {
  
  // Location
  var city = weatherReport.location.name;
  var region = weatherReport.location.region;

  // Current Weather
  const weatherdescription = weatherReport.current.condition.text;
  const weathericon = weatherReport.current.condition.icon;
  const temp = weatherReport.current.temp_f.toFixed(0);
  const highTemp = weatherReport.forecast.forecastday[0].day.maxtemp_f.toFixed(0);
  const lowTemp = weatherReport.forecast.forecastday[0].day.mintemp_f.toFixed(0);
  const pressure = weatherReport.current.pressure_in;
  const humidity = weatherReport.current.humidity;
  const wind = weatherReport.current.wind_mph.toFixed();
  const windDir = weatherReport.current.wind_dir;
  const icon_path = weathericon;
  const tempArray = weatherReport.forecast;
  
  // Generate Hourly Forecast
  function createHourly(hour) {

    let hourlyTable = []
    for (let i = 0; i < 24; i++) {      
      let nextHour = hour + i;

      // Resolves AM or PM
      let meridiem;
      if (nextHour < 12 || nextHour >= 24) {
        meridiem = 'AM';
      }
      else {
        meridiem = 'PM';
      }
        
      // Get Hourly Temperature
      let hourTemp = nextHour < 24 ? tempArray.forecastday[0].hour[nextHour].temp_f.toFixed(0) : tempArray.forecastday[1].hour[nextHour - 24].temp_f.toFixed(0);

      // Get Hourly Chance of Rain
      let hourRain = nextHour < 24 ? tempArray.forecastday[0].hour[nextHour].chance_of_rain : tempArray.forecastday[1].hour[nextHour - 24].chance_of_rain;

      // Get Hourly Wind Speed
      let hourWind = nextHour < 24 ? tempArray.forecastday[0].hour[nextHour].wind_mph.toFixed(0) : tempArray.forecastday[1].hour[nextHour - 24].wind_mph.toFixed(0);
      
      // Adjust Times to 12H Format
      nextHour = nextHour <= 24 ? nextHour : nextHour-24;
      nextHour = nextHour <= 12 ? nextHour : nextHour-12;
      
      // Adjust midnight 0:00 to display 12:00 AM
      nextHour = nextHour == 0 ? nextHour + 12: nextHour;
               
      // Create Rows
      hourlyTable.push(
        <div className="row">
        <div className="col-3">{`${nextHour}:00 ${meridiem}`}</div>
        <div className="col-3">{hourTemp} <span>&#176;</span>F</div>
        <div className="col-3"><img src={raindrop} className="raindrop" width="10px" />{` ${hourRain}%`}</div>
        <div className="col-3">{`${hourWind} mph`}</div>
        </div>
      );
      
    }
    return hourlyTable;
  }

  return (
    <div className="card">
        <div className="row">
          <div className="date col-12">
            {day} {month} {date} {year}
          </div>
        </div>
        <div className="row">
          <div className="city col-8">
            {city}
          </div>
          <div className="wind col-4">
          {wind} mph {windDir}
          </div>
        </div>
        <div className="row">
          <div className="region col-6">
            {region}
          </div>
        </div>
        <div className="row">
          <div className="temp col-12">
          <img src={icon_path} />
            {temp}<span>&#176;</span>F
          </div>
        </div>
        <div className="row">
          <div className="description col-12">
          {weatherdescription}
          </div>
        </div>
        <div className="row">
          <div className="description col-12">
          {highTemp}<span>&#176; / </span>
          {lowTemp}<span>&#176;</span>
          </div>
        </div>
        
        <div id="hourly" className="hourly">
          <div className="row">
            <div className="col-12 hourly-title">
              Hourly Forecast
            </div>
          </div>
        </div>
        <div className="hourly-table">
          {createHourly(hour)}
        </div>
      
      
    </div>
  );
}

export default Display;