import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

/** CHECKED **
 * Renders check svg and handles check click event
  * Toggle check svg style on click - toggleClass
  * Update bought qty and active state - checkHandler
 * @export to Item
*/
class Checked extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };

    this.toggleClass = this.toggleClass.bind(this);
    this.checkHandler = this.checkHandler.bind(this);
  }
 
 /** 
  * Toggles check state and style class .checked (svg fill)
 */
  toggleClass() {
    this.setState({ active: !this.state.active });    
  };

  /**
   * Bought checkbox onClick handler
   * countChange updates bought quantity
   * getState maintains item active state
  */
  checkHandler() {
    this.toggleClass();
    
    const {countChange} = this.props;
    countChange(this.state.active);

    const {getState} = this.props;
    getState(!this.state.active);
  }

  render() {
    
    return (
      <button className="invisible" onClick={this.checkHandler}>
        <svg id="" x="0px" y="0px" viewBox="0 0 32 32"  
          className={this.state.active ? 'checked': null} >
          <circle className={this.checkStyle} cx="16" cy="15.9" r="15.8"></circle> 
          <polygon className="check" points="23,9 13.2,18.8 9,14.5 6.4,17 10.7,21.3 13.2,23.8 15.8,21.3 25.6,11.5 "></polygon> 
        </svg>
      </button> 
    ); 
  }
}

/* PropTypes ------------------------- */
Checked.propTypes = {
  active: propTypes.bool,
  counter: propTypes.number,
  countChange: propTypes.func,
  getState: propTypes.func
}

export default Checked;