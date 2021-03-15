import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import Item from './Item';
import AddItemForm from './AddItemForm';

class App extends Component {
  
  state = {
    items: [],
    counter: 0
  };

  /* Item ID Counter */
  prevItemId = 0;

  /* Bought counter change handler -------------- */
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

  /* Item quantity change handler -------------- */
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

   /* Add item handler ------------------------ */
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

  /* Remove Item ------------------------------------ */
  handleRemoveItem = (id) => {
    this.setState( prevState => {
      return {
        items: prevState.items.filter(p => p.id !== id)
      };
    });
  }

  /* Clear list - remove all items, set bought counter to 0 */
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
        <Header 
          items={this.state.items}
          counter={this.state.counter}
          clearAll={this.handleClearItems}          
        />

        {/* items list */}
        {this.state.items.map( (player, index) =>
          <Item 
            name={ player.name }
            qty={ player.qty }
            id={ player.id }
            key={ player.id.toString() }
            index={ index }
            changeQty={ this.handleQtyChange } 
            removeItem={ this.handleRemoveItem }
            counter={ this.state.counter }
            countChange={ this.handleCountChange }
          />
        )}

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
