import React from 'react';

// Could use ES6 symbols in future
const CASE_SYMBOL = "__is-react-cond-component";

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
		let clauses = [];

		if (Array.isArray(children[0])) {
			clauses = children;
		} else if (children[0] && children[0].props && children[0].props[CASE_SYMBOL]) {
      // multiple clauses
			clauses = children.map(c => [c.props.test, c.props.children]);
		} else if (children && children.props && children.props[CASE_SYMBOL]) {
      // single clause
			clauses = [[children.props.test, children.props.children]];
		} else {
			clauses = [children];
		}

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
export const value = (name, condition) => val => condition(val[name]);

export const Clause = React.createClass({
	getDefaultProps() {
		return {[CASE_SYMBOL]: true};
	},
	render() {
		return null;
	}
});

export const Default = React.createClass({
	getDefaultProps() {
		return {
			test: T,
			[CASE_SYMBOL]: true
		};
	},
	render() {
		return null;
	}
});


const wrap = (fn, count=1) => (...args) => {
	if (args.length >= count + 1) {
		const [ name, ...params ] = args;
		return value(name, fn(...params));
	} else {
		return fn(...args);
	}
};

export const eq = wrap(x => y => x === y);
export const gt = wrap(x => y => y > x);
export const lt = wrap(x => y => y < x);
export const gte = wrap(x => y => y >= x);
export const lte = wrap(x => y => y <= x);
export const between = wrap((x, y) => val => x < val && val < y, 2);
export const isTrue = eq(true);
export const isFalse = eq(false);
export const isNull = eq(null);
export const isUndefined = eq(undefined);

export const and = (x, y) => val => x(val) && y(val);
export const or = (x, y) => val => x(val) || y(val);
export const not = x => val => !x(val);

