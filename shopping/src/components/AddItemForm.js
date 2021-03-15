import React, { Component } from 'react';
import propTypes from 'prop-types';

/* Add Item Component */

class AddItemForm extends Component {

	itemInput = React.createRef();

	/* Adds item and resets input value */
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addItem(this.itemInput.current.value);
		e.currentTarget.reset();
	}

	render() {
		return (

			/* Add item input form - calls handleSubmit() */
			<form onSubmit={this.handleSubmit}>
				<input 
					type="text"
					ref={ this.itemInput } 
					placeholder="Enter item"
					minLength="1"
				/>
				<input type="submit" value="Add Item" />
			</form>
		);
	}
}

/* PropTypes ------------------------- */
AddItemForm.propTypes = {
	addItem: propTypes.func
};

export default AddItemForm;