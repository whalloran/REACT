
import React from 'react';
import simplyweather from './img/simply-weather.png';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.zip == null) {
            return (
                <div className="home-container">
                    <h1 className="home-title">Simply Weather</h1>
                    <img src={simplyweather} />   
                </div>
            );
        }
        else {
            return null;
        }
    }
}

export default Home;