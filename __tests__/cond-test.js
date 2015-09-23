jest.dontMock('../module/');

import React from 'react/addons';
import { equal } from 'assert';

const { TestUtils } = React.addons;
const { Cond, T, gt, lt, lte, gte, eq, and, or, not, value, between} = require('../module/');

describe('React-Cond', () => {

  it('should render the child component if the condition is true', () => {
		let component = TestUtils.renderIntoDocument(
			<Cond value={true}>
				{[ T, <h1>expected</h1>]}
			</Cond>
		);
		let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
    equal(val.getDOMNode().textContent, 'expected');
	});

  it('should render the child component if the condition value is equal to `props.value`', () => {
		let component = TestUtils.renderIntoDocument(
			<Cond value={1}>
				{[ 2, <h1>unexpected</h1>]}
				{[ 1, <h1>expected</h1>]}
				{[ T, <h1>unexpected</h1>]}
			</Cond>
		);
		let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
    equal(val.getDOMNode().textContent, 'expected');
	});

  it('should render the result of `T` if no other is true', () => {
		let component = TestUtils.renderIntoDocument(
			<Cond value={1}>
				{[ 2, <h1>unexpected</h1>]}
				{[ 3, <h1>unexpected</h1>]}
				{[ T, <h1>expected</h1>]}
			</Cond>
		);
		let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
    equal(val.getDOMNode().textContent, 'expected');
	});

  it('should allow custom compare functions', () => {
		let component = TestUtils.renderIntoDocument(
			<Cond value={30}>
				{[ age => age < 10, <h1>nope</h1>]}
				{[ age => age > 10, <h1>expected</h1>]}
				{[ T, <h1>unexpected</h1>]}
			</Cond>
		);
		let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
    equal(val.getDOMNode().textContent, 'expected');
	});

  it('should allow custom default compare functions', () => {
		let component = TestUtils.renderIntoDocument(
			<Cond value={[6, 5, 4, 3, 2]} compare={(a, b) => a.indexOf(b) >= 0}>
				{[ 0, <h1>nope</h1>]}
				{[ 1, <h1>unexpected</h1>]}
				{[ 2, <h1>expected</h1>]}
				{[ T, <h1>otherwise</h1>]}
			</Cond>
		);
		let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
    equal(val.getDOMNode().textContent, 'expected');
	});

  it('should only render the first truthy clause', () => {
		let component = TestUtils.renderIntoDocument(
			<Cond value={30}>
				{[ age => age < 10, <h1>nope</h1>]}
				{[ age => age > 9, <h1>expected</h1>]}
				{[ age => age > 10, <h1>unexpected</h1>]}
				{[ T, <h1>unexpected</h1>]}
			</Cond>
		);
		let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
    equal(val.getDOMNode().textContent, 'expected');
	});

	describe('#gt', () => {

		it('should render the child component the value is gt the nr', () => {
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ gt(11), <h1>unexpected</h1>]}
					{[ gt(9), <h1>expected</h1>]}
					{[ T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#lt', () => {

		it('should render the child component the value is lt the nr', () => {
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ lt(10), <h1>unexpected</h1>]}
					{[ lt(11), <h1>expected</h1>]}
					{[ T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#lte', () => {

		it('should render the child component the value is lte the nr', () => {
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ lte(9), <h1>unexpected</h1>]}
					{[ lte(10), <h1>expected</h1>]}
					{[ T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#gte', () => {

		it('should render the child component the value is gte the nr', () => {
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ gte(11), <h1>unexpected</h1>]}
					{[ gte(10), <h1>expected</h1>]}
					{[ T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#not(eq)', () => {

		it('should render the child component the value is not eq the nr', () => {
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ not(eq(10)), <h1>unexpected</h1>]}
					{[ not(eq(11)), <h1>expected</h1>]}
					{[ T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#eq', () => {

		it('should render the child component the value is eq the nr', () => {
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ eq(11), <h1>unexpected</h1>]}
					{[ eq(10), <h1>expected</h1>]}
					{[ T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#between', () => {

		it('should render the child component the value is between the nr', () => {
			let component = TestUtils.renderIntoDocument(
				<Cond value={10}>
					{[ between(10, 12), <h1>unexpected</h1>]}
					{[ between(9, 11), <h1>expected</h1>]}
					{[ T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});


	describe('#and', () => {

		it('should render the child component both conditions are true', () => {
			const startsWith = x => str => str.startsWith(x);
			const endsWith = x => str => str.endsWith(x);

			let component = TestUtils.renderIntoDocument(
				<Cond value={'_test_'}>
					{[ and(startsWith('-'), endsWith('-')), <h1>unexpected</h1>]}
					{[ and(startsWith('-'), endsWith('_')), <h1>unexpected</h1>]}
					{[ and(startsWith('_'), endsWith('-')), <h1>unexpected</h1>]}
					{[ and(startsWith('_'), endsWith('_')), <h1>expected</h1>]}
					{[ T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#or', () => {

		it('should render the child component both conditions are true', () => {
			const startsWith = x => str => str.startsWith(x);
			const endsWith = x => str => str.endsWith(x);

			let component = TestUtils.renderIntoDocument(
				<Cond value={'_test_'}>
					{[ or(startsWith('-'), endsWith('-')), <h1>unexpected</h1>]}
					{[ or(startsWith('-'), endsWith('_')), <h1>expected</h1>]}
					{[ or(startsWith('_'), endsWith('-')), <h1>unexpected</h1>]}
					{[ or(startsWith('_'), endsWith('_')), <h1>unexpected</h1>]}
					{[ T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#not ', () => {

		it('should render the child component both conditions are true', () => {
			const startsWith = x => str => str.startsWith(x);
			const endsWith = x => str => str.endsWith(x);

			let component = TestUtils.renderIntoDocument(
				<Cond value={20}>
					{[ not(x => x < 30),<h1>unexpected</h1>]}
					{[ not(x => x > 30),<h1>expected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

	describe('#value', () => {

		it('should render the component if the value is eq to a value', () => {
			const obj = { val1: 12, val2: 13 };

			let component = TestUtils.renderIntoDocument(
				<Cond value={{...obj}}>
					{[ and(value('val1', eq(11)), value('val2', eq(12))), <h1>unexpected</h1>]}
					{[ and(value('val1', eq(12)), value('val2', eq(13))), <h1>expected</h1>]}
					{[ T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});

		it('should render the component if the value is eq to a value, with a named value', () => {
			const obj = { val1: 12, val2: 13 };

			let component = TestUtils.renderIntoDocument(
				<Cond value={{...obj}}>
					{[ and(eq('val1', 11), gte('val2', 12)), <h1>unexpected</h1>]}
					{[ and(eq('val1', 12), gte('val2', 13)), <h1>expected</h1>]}
					{[ T, <h1>unexpected</h1>]}
				</Cond>
			);
			let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
			equal(val.getDOMNode().textContent, 'expected');
		});
	});

});
