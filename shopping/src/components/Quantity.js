import React from 'react';
import propTypes from 'prop-types';

const Quantity = ({index, qty, changeQty}) => {

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