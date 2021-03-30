import React, { Component } from 'react';
import propTypes from 'prop-types';

/** FORM **
 * Form to input shift times and add shift
  * Displays total hours worked
  * Input shift, submit
  * Reset - delete all shifts, set totals to 0
*/
class Form extends Component {
	constructor(props) {
    super(props);

    this.resetHandler = this.resetHandler.bind(this);
  }

  /** References - shift inputs  **/
	inHourInput = React.createRef();
	inMinInput = React.createRef();
	outHourInput = React.createRef();
	outMinInput = React.createRef();

  /**
   * Handles add shift form submit
   * Validates inputted hours and minutes as numbers
   * Once validated, inputs passed to formHandler in App
   * @param   {Object}   e - submit button
  */
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


  /** 
   * Handles reset button click event
   * Calls handleClearShifts -> deletes all shifts 
   * Only called from resetConfirm
   * Resets all inputs to blank
   * @param   {Object}   e - Reset button passed from resetConfirm 
  */
  resetHandler = (e) => {
    // Reset form inputs to 00
    this.inHourInput.current.value = "";
    this.inMinInput.current.value = "";
    this.outHourInput.current.value = "";
    this.outMinInput.current.value = "";
  	
    this.props.clearAll();   // handleClearShifts
  }

  /**
   * Requires user to confirm before deleting all shifts
   * @param   {Object}   e - reset button
   * Once user confirms, calls resetHandler
  */
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
            <input type="number" ref={this.inMinInput} id="inMinute" step="1" min="0" max="59" placeholder="00" />
         </div>
         <div className="form-group">
            <label htmlFor="outHour">OUT</label>
            <input type="number" ref={this.outHourInput} id="outHour" step="1" min="0" max="23" placeholder="00" />
            <input type="number" ref={this.outMinInput} id="outMinute" step="1" min="0" max="59" placeholder="00" />
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