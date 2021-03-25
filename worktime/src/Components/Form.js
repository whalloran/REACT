import React, { Component } from 'react';
import propTypes from 'prop-types';

class Form extends Component {
	constructor(props) {
    super(props);

    this.resetHandler = this.resetHandler.bind(this);
  }

  // References
	inHourInput = React.createRef();
	inMinInput = React.createRef();
	outHourInput = React.createRef();
	outMinInput = React.createRef();

  timeCalc = (e) => {
  	e.preventDefault();
  	
  	let inH = parseInt(this.inHourInput.current.value);
  	let inM = parseInt(this.inMinInput.current.value);
  	let outH = parseInt(this.outHourInput.current.value);
  	let outM = parseInt(this.outMinInput.current.value);

    // Validate inputs - only accept numbers
    if( Number.isNaN(inH) || Number.isNaN(inM) || Number.isNaN(outH) || Number.isNaN(outM) ) {
      alert('Please complete all fields to continue');
    }
    
    else {
  	 this.props.formHandle(inH, inM, outH, outM);  // formHandler
    }
  }


  // Deletes all shifts - only called from resetConfirm
  resetHandler = (e) => {
    // Reset form inputs to 00
    this.inHourInput.current.value = "";
    this.inMinInput.current.value = "";
    this.outHourInput.current.value = "";
    this.outMinInput.current.value = "";
  	
    this.props.clearAll();   // handleClearShifts
  }

  // Confirm delete all shifts
  resetConfirm = (e) => {
    e.preventDefault();
    if (window.confirm("Delete all shifts?\nThis cannot be undone")) {
      this.resetHandler(e);
    } 
  }

	render() {
		
		return (
			<div className="formContainer">
				<div className="total">
					<span id="totalH">
						Total Hours: {this.props.decTotal.toFixed(2)}
					</span>	
				</div>
        <form onSubmit={this.timeCalc} id="shiftForm">
          <div className="form-group">
            <label htmlFor="inHour">IN</label>
            <input type="number" ref={this.inHourInput} id="inHour" step="1" min="0" max="23" placeholder="00" />
            <input type="number" ref={this.inMinInput} id="inMinute" step="1" min="0" max="60" placeholder="00" />
         
            <label htmlFor="outHour">OUT</label>
            <input type="number" ref={this.outHourInput} id="outHour" step="1" min="0" max="23" placeholder="00" />
            <input type="number" ref={this.outMinInput} id="outMinute" step="1" min="0" max="60" placeholder="00" />
          </div>
          <div>
            <input type="submit" id="submit" value="Submit" />
            <button id="reset" onClick={this.resetConfirm} >
            	Reset
            </button>
          </div>
        </form>
      </div> 
		);
	}
}

Form.propTypes = {
	formHandle: propTypes.func,
  decTotal: propTypes.number
}

export default Form;