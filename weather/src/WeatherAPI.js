import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Display from './weatherReportDisplay';

const API_KEY = '4306a522b1be4759b6741658210410';
const UNITS = "imperial";
const LANG = "en";

class WeatherAPI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherReport : null,
            isLoading : true,
            error : null
        }
    }
    componentDidUpdate() {
    var URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${this.props.zip}&days=3&aqi=no&alerts=no`;

    fetch(URL).then(response =>{
        if(response.ok) {return response.json() }
        else { throw new Error("SOMETHING WENT WRONG")}})
            .then(data => this.setState(
                { weatherReport : data,
                    isLoading: false }))
            .catch(error => this.setState( {error, isLoading : true }));
    }
    render() {
        if(this.state.isLoading) {
            if(this.props.zip != null) {
                return (
                    <div>
                        <LinearProgress  />
                    </div>
                );
            }
            else return null;
        }
        else {
            return(
                <div>
                    <Display weatherReport = {this.state.weatherReport}/>
                </div>
            )
        }
    }
}

export default WeatherAPI;