import React, { Component } from 'react';

import Header from './Header.js';
import Form from './Form.js';
import Times from './Times';

import '../App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
     shifts: [],          // Contains all calculated shifts
     times : [],          // Used to create displayTime.. 00:00 - 00:00 
     displayTime: '',     // Current time in display format
     clockTime: '',       // current time in HH:MM
     decTotal: 0         // Running total in decimals
    };

    this.formHandler = this.formHandler.bind(this);
  } 

  /* Shift ID Counter */
  prevItemId = 0;

  // Receive time inputs from Form to calculate & display
  formHandler = (inHour, inMin, outHour, outMin) => {

    // Reset hours, min, times[]
    let hours = 0;
    let minutes = 0;

    this.setState({
      times: []
    })

    // Display In & Out Times
    let times = this.state.times;
    times.push(inHour, inMin, outHour, outMin);

    // Add zero before single digit hours & minutes
    for (let i=0; i < times.length; i++) {
      if (times[i].toString().length === 1) {
        times[i] = "0" + times[i];
      }
    }
  
/* -------------------- Calculate Time -------------------- */

    if (inMin > outMin  && inHour < outHour) {
      minutes = 60 - inMin + outMin;
      hours = outHour - inHour - 1;
    }

    else if (inMin <= outMin && inHour > outHour) {
      hours = 24 - inHour + outHour;
      minutes = outMin - inMin;
    }

    else if (inMin > outMin  && inHour >= outHour) {
      hours = 24 - inHour + outHour - 1;
      minutes = 60 - inMin + outMin;
    }

    // inHour < outHour && inMin < outMin
    else {
      hours = outHour - inHour;
      minutes = outMin - inMin;
    }

    let clockHours = hours.toString();
    let clockMinutes = minutes.toString();

    // Clock hours display - add leading 0
    if (clockHours.toString().length === 1) {
        clockHours = "0" + hours;
    }

    if (clockMinutes.toString().length === 1) {
        clockMinutes = "0" + minutes;
    }

    const timeDeci = hours + (minutes / 60);
    
    // Total Hours Counter - add hours to total (decimal)
    this.setState( prevState => ({
        decTotal: prevState.decTotal += timeDeci
    }));

/* -------------------- Add Shift -------------------- */
    
    // Shift ID counter 
    this.prevItemId += 1;

    // Add Shift to list
    this.setState( prevState => {
      return {
        shifts: [
          ...prevState.shifts,
          {
            displayTime: times[0] + ':' + times[1] + ' - ' + 
                         times[2] + ':' + times[3],
            clockTime: clockHours + ':' + clockMinutes,
            timeDec: hours + (minutes / 60),
            id: this.prevItemId
          }
        ]
      }
    });
  } // End formHandler()

  /* Delete Shift ------------------------------------ */
  handleDeleteShift = (id) => {
    this.setState( prevState => {
      return {
        shifts: prevState.shifts.filter(p => p.id !== id)
      };
    });
  }

   /* Adjust Total when Shift is deleted -------------- */
  handleTotalChange = (decTime) => {
    this.setState( prevState => ({
      decTotal: prevState.decTotal - decTime
    }));
    
  }

  /* Clear list - remove all items, set bought counter to 0 */
  handleClearShifts = (id) => {
    this.setState( prevState => {
      return {
        shifts: this.state.shifts.filter(p => p.id === 'x'),
        decTotal: 0
      };
    });
  }

  render() {
    return (
      <div className="App">
      
        <Header />
  
        {this.state.shifts.map( (shift, index) =>
          <Times
            index={ index } 
            id={ shift.id } 
            key={ shift.id.toString() }
            times={this.state.times}
            clockTime={shift.clockTime}  
            timeDec={shift.timeDec}
            displayTime={shift.displayTime}
            decTotal={this.state.decTotal}
            deleteShift={ this.handleDeleteShift }
            totalChange={ this.handleTotalChange }
          />
        )}

        <Form 
          formHandle={this.formHandler}
          decTotal={this.state.decTotal}
          clearAll={this.handleClearShifts}
        />
      </div>
    );
  }
}

export default App;
