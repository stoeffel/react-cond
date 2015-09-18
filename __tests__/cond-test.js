jest.dontMock('../module/');

import React from 'react/addons';
import { equal } from 'assert';

const { TestUtils } = React.addons;
const { Cond, T } = require('../module/');

describe('React-Cond', () => {
  //it('should render child component', () => {
		//const component = TestUtils.renderIntoDocument(
			//<Cond value={true}>
				//<h1>expected</h1>
			//</Cond>
		//);
		//const val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
    //equal(val.getDOMNode().textContent, 'expected');
	//});

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
});
