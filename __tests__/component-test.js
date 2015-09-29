jest.dontMock('../module/');

import React from 'react/addons';
import { equal } from 'assert';

const { TestUtils } = React.addons;
const {
	Cond,
	Case,
	Default
} = require('../module/');
describe('React-Cond components', () => {

  it('should render the child component if the condition value is equal to `props.value`', () => {
		let component = TestUtils.renderIntoDocument(
			<Cond value={1}>
				<Case test={2}><h1>unexpected</h1></Case>
				<Case test={1}><h1>expected</h1></Case>
				<Default><h1>default</h1></Default>
			</Cond>
		);
		let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
		equal(val.getDOMNode().textContent, 'expected');
	});

  it('should render the child component if the condition matches', () => {
	  	const isEven = (i) => i % 2 === 0;
	  	const isOdd = (i) => i % 2 !== 0;

		let component = TestUtils.renderIntoDocument(
			<Cond value={5}>
				<Case test={isEven}><h1>even</h1></Case>
				<Case test={isOdd}><h1>odd</h1></Case>
				<Default><h1>wut?</h1></Default>
			</Cond>
		);
		let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
		equal(val.getDOMNode().textContent, 'odd');
	});

  it('should render the default value if no cases match', () => {
		let component = TestUtils.renderIntoDocument(
			<Cond value={10}>
				<Case test={2}><h1>unexpected</h1></Case>
				<Case test={1}><h1>expected</h1></Case>
				<Default><h1>default</h1></Default>
			</Cond>
		);
		let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
		equal(val.getDOMNode().textContent, 'default');
	});

});
