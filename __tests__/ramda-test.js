jest.dontMock('../module/');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R, { __ } from 'ramda';
import { equal } from 'assert';

const { Cond, value, and } = require('../module/');


describe('React-Cond', () => {

	describe('#R.gt', () => {

		it('should render the child component the value is gt the nr', () => {
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ R.gt(__, 11), <h1 key={1}>unexpected</h1>]}
					{[ R.gt(__, 9), <h1 key={2}>expected</h1>]}
					{[ R.T, <h1 key={3}>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.textContent, 'expected');
		});
	});

	describe('#R.lt', () => {

		it('should render the child component the value is lt the nr', () => {
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ R.lt(__, 10), <h1 key={1}>unexpected</h1>]}
					{[ R.lt(__, 11), <h1 key={2}>expected</h1>]}
					{[ R.T, <h1 key={3}>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.textContent, 'expected');
		});
	});

	describe('#R.lte', () => {

		it('should render the child component the value is lte the nr', () => {
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ R.lte(__, 9), <h1 key={1}>unexpected</h1>]}
					{[ R.lte(__, 10), <h1 key={2}>expected</h1>]}
					{[ R.T, <h1 key={3}>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.textContent, 'expected');
		});
	});

	describe('#R.gte', () => {

		it('should render the child component the value is gte the nr', () => {
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ R.gte(__, 11), <h1 key={1}>unexpected</h1>]}
					{[ R.gte(__, 10), <h1 key={2}>expected</h1>]}
					{[ R.T, <h1 key={3}>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.textContent, 'expected');
		});
	});

	describe('#R.not(R.equals)', () => {

		it('should render the child component the value is not eq the nr', () => {
			const notEquals = R.compose(R.not, R.equals);

			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ notEquals(10), <h1 key={1}>unexpected</h1>]}
					{[ notEquals(11), <h1 key={2}>expected</h1>]}
					{[ R.T, <h1 key={3}>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.textContent, 'expected');
		});
	});

	describe('#R.equals', () => {

		it('should render the child component the value is eq the nr', () => {
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ R.equals(11), <h1 key={1}>unexpected</h1>]}
					{[ R.equals(10), <h1 key={2}>expected</h1>]}
					{[ R.T, <h1 key={1}>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.textContent, 'expected');
		});
	});

	describe('#between', () => {

		it('should render the child component the value is between the nr', () => {
			const between = (x, y) => R.allPass([R.gt(__, x), R.lt(__, y)]);

			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ between(10, 12), <h1 key={1}>unexpected</h1>]}
					{[ between(9, 11), <h1 key={2}>expected</h1>]}
					{[ R.T, <h1 key={3}>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.textContent, 'expected');
		});
	});


	describe('#R.allPass', () => {

		it('should render the child component both conditions are true', () => {
			const startsWith = x => str => str.startsWith(x);
			const endsWith = x => str => str.endsWith(x);

			let component = TestUtils.renderIntoDocument(
				<Cond value={'_test_'}>
					{[ R.allPass([startsWith('-'), endsWith('-')]), <h1 key={1}>unexpected</h1>]}
					{[ R.allPass([startsWith('-'), endsWith('_')]), <h1 key={2}>unexpected</h1>]}
					{[ R.allPass([startsWith('_'), endsWith('-')]), <h1 key={3}>unexpected</h1>]}
					{[ R.allPass([startsWith('_'), endsWith('_')]), <h1 key={4}>expected</h1>]}
					{[ R.T, <h1 key={5}>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.textContent, 'expected');
		});
	});

	describe('#R.anyPass', () => {

		it('should render the child component both conditions are true', () => {
			const startsWith = x => str => str.startsWith(x);
			const endsWith = x => str => str.endsWith(x);

			let component = TestUtils.renderIntoDocument(
				<Cond value={'_test_'}>
					{[ R.anyPass([startsWith('-'), endsWith('-')]), <h1 key={1}>unexpected</h1>]}
					{[ R.anyPass([startsWith('-'), endsWith('_')]), <h1 key={2}>expected</h1>]}
					{[ R.anyPass([startsWith('_'), endsWith('-')]), <h1 key={3}>unexpected</h1>]}
					{[ R.anyPass([startsWith('_'), endsWith('_')]), <h1 key={4}>unexpected</h1>]}
					{[ R.T, <h1 key={5}>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.textContent, 'expected');
		});
	});

	describe('#propEq', () => {

		it('should render the component if the value is eq to a value', () => {
			const obj = { val1: 12, val2: 13 };

			let component = TestUtils.renderIntoDocument(
				<Cond value={{...obj}}>
					{[ and(R.propEq('val1', 11), R.propEq('val2', 12)), <h1 key={1}>unexpected</h1>]}
					{[ and(R.propEq('val1', 12), R.propEq('val2', 13)), <h1 key={2}>expected</h1>]}
					{[ R.T, <h1 key={3}>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.textContent, 'expected');
		});
	});

});
