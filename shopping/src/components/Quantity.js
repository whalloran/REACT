import React from 'react';
import propTypes from 'prop-types';

/** QUANTITY **
 * Item quantity counter - increase / decrease quantity
 * Handles +/- button clicks
 * @param   {integer}   index - index of item in items array
 * @param   {qty}   qty - individual item quantity
 * @param   {function}   changeQty - handles qty change - handleQtyChange
 * @export to Item
*/

const Quantity = ({index, qty, changeQty}) => {
console.log(typeof index);
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={() => changeQty(index, -1)}> - </button>
      <span className="counter-qty">{ qty }</span>
      <button className="counter-action increment" onClick={() => changeQty(index, 1)}> + </button>
    </div>
  ); 
}

/* PropTypes ------------------------- */
Quantity.propTypes = {
	index: propTypes.number,
	qty: propTypes.number,
	changeQty: propTypes.func
}

export default Quantity;