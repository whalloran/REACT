import React from 'react';
import propTypes from 'prop-types';

const Count  = ({ items }) => {
	
	const totalProducts = items.length;
	const totalItems = items.reduce( (total, item) => {
		return total + item.qty;
	}, 0);

	return (
		<table className="count">
			<tbody>
				<tr>
			    	<td>Total Items:</td>
			    	<td>{ totalProducts }</td>
				</tr>
				<tr>
			    	<td>Total Qty:</td>
			    	<td>{ totalItems }</td>
				</tr>
			</tbody>
		</table>
	);
}

/* PropTypes ------------------------- */
Count.propTypes = {
	items: propTypes.arrayOf(propTypes.shape({
		qty: propTypes.number
	}))
};

export default Count;