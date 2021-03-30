import React from 'react';
import propTypes from 'prop-types';
import Bought from './Bought';
import Count from './Count';

/** HEADER  **
 * Render App Header
 * Import Count - total items and total qty counters
 * Display App title
 * Import Bought - bought item counter, clear all button
 
 * @param   {Array}   items - items that have been added
 * @param   {integer}   counter - bought counter (items checked)
 * @param   {function}   clearAll - clears all items from list - handleClearItems
 * @param   {string}   title - App title
 
 * Export to App
*/

const Header = ({ items, counter, clearAll, title }) => {
	return (
	    <header>
	    	<Count items={ items } counter={ counter }/>
	    	<h1>{ title }</h1>
	    	<Bought items={ items } clearAll={clearAll} counter={counter} />
	    </header>
	);
}

/* Default Props - App Title */
Header.defaultProps = {
	title: 'My Shopping List'
};

/* PropTypes ------------------------- */
Header.propTypes = {
	items: propTypes.array,
	counter: propTypes.number,
	clearAll: propTypes.func,
	title: propTypes.string
}

export default Header;