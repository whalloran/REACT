import React, { Component } from 'react';
import propTypes from 'prop-types';

class Bought extends Component {
	constructor(props) {
    	super(props);
		this.clearHandler = this.clearHandler.bind(this);
	}
	
	clearHandler() {	
		this.props.clearAll();
	}

	render() {
		const { counter } = this.props;

		return (
			<div className="bought">
				<h2>Items Bought</h2>
				<span className="bought-counter">{ counter }</span> 
				<button onClick={ this.clearHandler }>Clear List</button>
			</div>
		);
	}
}

/* PropTypes ------------------------- */
Bought.propTypes = {
	counter: propTypes.number,
	items: propTypes.array,
	clearAll: propTypes.func
}

export default Bought;
