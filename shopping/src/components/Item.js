
import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import Quantity from './Quantity';
import Checked from './Checked';

/**  ITEM  **
 * Displays Items as they are added
 * Displays Item remove buttons
 * @import Checked - bought checkboxes
 * @import Quantity - item quantity counter
 * @export to App
*/
class Item extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };

    this.getState = this.getState.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
  }

  /**
   * Maintains item checked state
   * @param   {boolean}   currentState - state passed from Checked
   * @returns   {boolean}   active state == currentState
  */
  getState(currentState) {
    if (this.state.active !== currentState) {     /* Avoids infinite render loop */
      this.setState( prevState => {
        return {
          active: currentState
        };
      });
    }
  }

  /**
   * Remove item - pass id to handleRemoveItem
   * Adjusts bought based on active state 
  */
  removeHandler () {
    const { 
      removeItem,
      id, 
      countChange
    } = this.props;
    
    removeItem(id);     /* handleRemoveItem */
    
    /* Subtract 1 from Bought counter 
        when active checked item is removed */
    if (this.state.active === true) {
      countChange(true);     /* handleCountChange */ 
    }
  }

  render() {

    const { 
      name,
			qty,
			index,
			changeQty,
      counter,
      countChange,
      active
		} = this.props;

    return (
      <div className="item">
		    <span className="item-name">
          <button className="remove-item" onClick={this.removeHandler}>✖</button>
 			    
          {/* Checked */}
          <Checked counter={counter} countChange={ countChange } getState={this.getState} active={active}/>
        	
          {/* Item Name */}
          { name }
  		  </span>

        {/* Quantity Counter */}
        <Quantity          
          qty={ qty }
          index={ index }
          changeQty={ changeQty }
  		  /> 
    	</div>
    );
	}	
}

/** PropTypes ------------------------- */
Item.propTypes = {
  active: propTypes.bool,
  name: propTypes.string,
  qty: propTypes.number,
  id: propTypes.number,
  index: propTypes.number,
  counter: propTypes.number,
  changeQty: propTypes.func,
  countChange: propTypes.func,
  removeItem: propTypes.func
}

export default Item;