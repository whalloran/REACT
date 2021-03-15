import React from 'react';
import propTypes from 'prop-types';
import Bought from './Bought';
import Count from './Count';

/* HEADER - Count, Title, Bought ---------------------- */

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