import React, { Component } from 'react';
import propTypes from 'prop-types';

class Times extends Component {
	constructor(props) {
    super(props);

    this.deleteHandler = this.deleteHandler.bind(this);
  }

	deleteHandler = (e) => {
    const { 
      deleteShift,
      id, 
      totalChange
    } = this.props;
    e.preventDefault();
    deleteShift(id);      /* handleDeleteShift */
    totalChange(this.props.timeDec.toFixed(2));
  }

	render() {

		return (
			<div className="times">
				<div>
					<button className="remove-item invisible" onClick={this.deleteHandler}>X</button>
					{this.props.displayTime}
				</div>
				<div>
					{this.props.clockTime} 
				</div>
				<div id="shiftTotal">
					{this.props.timeDec.toFixed(2)} 
				</div>
			</div>
		);
	}
}

Times.propTypes = {
	index: propTypes.number,
  id: propTypes.number,
  times: propTypes.array,
  clockTime: propTypes.string,
  timeDec: propTypes.number,
  displayTime: propTypes.string,
  decTotal: propTypes.number
}

export default Times;