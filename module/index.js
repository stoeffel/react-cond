import React from 'react';

const isFunction = func => typeof func === 'function';
const isEqual = (a, b) => a === b;

const makeClause = compare => ([condition, result]) =>
  isFunction(condition)?
	  [condition, result]
		: [x=> compare(x, condition), result];

const findFirst = (arr, cond) => arr.filter((_val, i ) => cond(arr[i]))[0];

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
export const eq = x => y => x === y;
export const gt = x => y => y > x;
export const lt = x => y => y < x;
export const gte = x => y => y >= x;
export const lte = x => y => y <= x;
export const and = (x, y) => val => x(val) && y(val);
export const or = (x, y) => val => x(val) || y(val);
export const not = (x) => val => !x(val)

