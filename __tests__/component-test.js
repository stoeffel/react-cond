jest.dontMock('../module/');

import React from 'react';
import { equal } from 'assert';
import TestUtils from 'react-addons-test-utils';

const {
	Cond,
	Clause,
	Default
} = require('../module/');
describe('React-Cond components', () => {

  it('should render the child component for a single condition if it matches', () => {
	  	const isTrue = (i) => i;

		let component = TestUtils.renderIntoDocument(
			<Cond value={true}>
				<Clause key='1' test={isTrue}><h1>Works!</h1></Clause>
			</Cond>
		);
		let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
		equal(val.textContent, 'Works!');
	});

  it('should render the child component if the condition value is equal to `props.value`', () => {
		let component = TestUtils.renderIntoDocument(
			<Cond value={1}>
				<Clause key='1' test={2}><h1>unexpected</h1></Clause>
				<Clause key='2' test={1}><h1>expected</h1></Clause>
				<Default key='default'><h1>default</h1></Default>
			</Cond>
		);
		let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
		equal(val.textContent, 'expected');
	});

  it('should render the child component if the condition matches', () => {
	  	const isEven = (i) => i % 2 === 0;
	  	const isOdd = (i) => i % 2 !== 0;

		let component = TestUtils.renderIntoDocument(
			<Cond value={5}>
				<Clause key='1' test={isEven}><h1>even</h1></Clause>
				<Clause key='2' test={isOdd}><h1>odd</h1></Clause>
				<Default key='default'><h1>wut?</h1></Default>
			</Cond>
		);
		let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
		equal(val.textContent, 'odd');
	});

  it('should render the default value if no cases match', () => {
		let component = TestUtils.renderIntoDocument(
			<Cond value={10}>
				<Clause key='1' test={2}><h1>unexpected</h1></Clause>
				<Clause key='2' test={1}><h1>expected</h1></Clause>
				<Default key='default'><h1>default</h1></Default>
			</Cond>
		);
		let val = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
		equal(val.textContent, 'default');
	});

});
