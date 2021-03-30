import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import Item from './Item';
import AddItemForm from './AddItemForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      counter: 0,
    };
  }

  /* Item ID Counter */
  prevItemId = 0;

  /** 
   * Bought count change handler - countChange
   * @param {boolean} currentState indicates checkbox state
   * if true, becomes false (uncheck), subtract 1 from counter 
   * if false, becomes true (check), add 1 to bought counter  
  */
  handleCountChange = (currentState) => {
    if (currentState === false) {
      this.setState( prevState => ({
        counter: prevState.counter + 1
      }));
    }

    else {
      this.setState( prevState => ({
      counter: prevState.counter - 1
      }));
    }
  }

  /** 
   * Item quantity change handler - changeQty
   * Adjusts item quantity when + / - button is clicked
   * @param   {integer}   index - item index in items array
   * @param   {integer}   delta - quantity change value (1 || -1)
  */
  handleQtyChange = (index, delta) => {
    if (this.state.items[index].qty + delta < 1) {
      this.setState( prevState => ({
        qty: prevState.items[index].qty = 1
      }));
    }
    else {
      this.setState( prevState => ({
      qty: prevState.items[index].qty += delta
    }));
    }

  }

  /** 
    * Add item handler - addItem
    * Adds item to shopping list
    * @param   {string}   name - item name as inputted by user
    * @return   {Object[]}   items - all items that have been added
  */
  handleAddItem = (name) => {
    this.setState( prevState => {
      return {
        items: [
          ...prevState.items,
          {
            name,
            qty: 1,
            id: this.prevItemId += 1
          }
        ]
      }
    });
  }

  /** Remove item handler - removeItem
   * Removes item from list when remove (X) button is clicked
   * @param   {integer}   id - id of item to be removed
   * @return   {Object[]}   items - all items after removal
  */
  handleRemoveItem = (id) => {
    this.setState( prevState => {
      return {
        items: prevState.items.filter(p => p.id !== id)
      };
    });
  }

  /** Clear list handler - clearAll
   * Removes all items from list
   * Sets bought counter to 0 
   * @param   {integer}   id - id of each item on list
   * @return   {Object[]}   items - empty items array
  */
  handleClearItems = (id) => {
    this.setState( prevState => {
      return {
        items: prevState.items.filter(p => p.id === 'x')
      };
    });

    this.setState( prevState => {
      return {
        counter: 0
      };
    });
  }

  render() {

    return (
      <div className="shopping">
        {/** App Header
           * Item quantity counter
           * App title
           * Bought items counter
           * Clear All button
        */}
        <Header 
          items={this.state.items}
          counter={this.state.counter}
          clearAll={this.handleClearItems}          
        />

        {/** Items List 
          * Displays list of all items that have been added
           * Remove item button (X)
           * Check svg - bought item
           * Item name
           * Item quantity counter
          * Creates new array with all items, properties
          * @param   {Object}   item - item that has been added
          * @param   {integer}   index - item index in items array
        */}
        {this.state.items.map( (item, index) =>
          <Item 
            name={ item.name }
            qty={ item.qty }
            id={ item.id }
            key={ item.id.toString() }
            index={ index }
            changeQty={ this.handleQtyChange } 
            removeItem={ this.handleRemoveItem }
            counter={ this.state.counter }
            countChange={ this.handleCountChange }
          />
        )}
        {/* Add Item Form 
           * Add item input
           * Submit button
        */}
        <AddItemForm addItem={this.handleAddItem} />
      </div>
    );
  }
}

App.propTypes = {
  index: propTypes.array,
  counter: propTypes.number,
  qty: propTypes.number
}

export default App;
