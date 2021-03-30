import React, { Component } from 'react';
import propTypes from 'prop-types';

/**  ADD ITEM FORM  **
 * Form input to add new item to list
 * Add item submit button
 * @export to App
*/

class AddItemForm extends Component {

	itemInput = React.createRef();

	/**
	 * Handles Add Item button click
	 * @param   {Object}   e - form 
	 * Adds new item to list - handleAddItem
	 * Resets input value to blank 
	*/
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
					maxLength="18"
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