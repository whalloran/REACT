import React from 'react';
import propTypes from 'prop-types';

/** COUNT **
 * Display Total Items & Total Quantity
 * @param   {Object[]}   items - items that have been added
 * @export to Header
*/

const Count  = ({ items }) => {
	
	const totalProducts = items.length;
	
	/**
	 * Adds item quantities
	 * @param   {integer}   total - accumulator
	 * @param   {integer}   item - current value (item qty)
	 * @returns   {integer}   totalItems - total item qtys
	*/
	const totalItems = items.reduce( (total, item) => {
		return total + item.qty;
	}, 0);

	return (
		<table className="count">
			<tbody>
				<tr>
			    	<td><span className="mobileHide">Total</span> Items: </td>
			    	<td className="count-num">{ totalProducts }</td>
				</tr>
				<tr>
			    	<td>Total<span className="mobileHide"> Qty</span>: </td>
			    	<td className="count-num">{ totalItems }</td>
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