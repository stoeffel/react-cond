import React from 'react';

const isFunction = func => typeof func === 'function';
const isEqual = (a, b) => a === b;

const makeClause = compare => ([condition, result]) =>
  isFunction(condition)?
	  [condition, result]
		: [x=> compare(x, condition), result];

const findFirst = (arr, cond) => {
	let match = 0;

	for (let i = 0; i < arr.length; i++) {
		if (cond(arr[i])) {
			match = i;
			break;
		}
	}

	return arr[match];
};

export const Cond = React.createClass({

	getDefaultProps() {
		return {
			compare: isEqual
		};
	},

	componentWillReceiveProps({ value: nextValue, compare: nextCompare }) {
		const { compare, value } = this.props;
		
		if ( compare !== nextCompare || value !== nextValue ) this.forceUpdate();
	},

	render() {
		const { children, compare, value } = this.props;

		const clauses = Array.isArray(children[0])? children: [children];

		const normalized = clauses.map( clause =>
			Array.isArray(clause)?
				makeClause(compare)(clause)
				: [ T, clause ]
		);

		const [condition, result] = findFirst(normalized, ([ condition, result]) => condition(value) );

		return result;
	}
});

export const T = () => true;
