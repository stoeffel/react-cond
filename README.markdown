<h1 align="center">react-cond</h1>

<p align="center">

  <a href="#usage">Usage</a> |
  <a href="#license">License</a>
  <br><br>
  <img align="center" src="http://33.media.tumblr.com/cc0170c0a46e44f05347ed5e6197ef4c/tumblr_mv2pp0cnrV1qcung4o1_400.gif">
  <br>
  <sub>logo by <a href="http://justinmezzell.tumblr.com/">Justin Mezzell</a></sub>
  <blockquote align="center"><a href="http://www.cis.upenn.edu/~matuszek/LispText/lisp-cond.html">Lisp-Style</a> conditional rendering in react.</blockquote>
</p>

[![Build Status](https://travis-ci.org/stoeffel/react-cond.svg?branch=master)](https://travis-ci.org/stoeffel/react-cond)
[![Dependency Status](https://david-dm.org/stoeffel/react-cond.svg)](https://david-dm.org/stoeffel/react-cond)
[![npm version](https://badge.fury.io/js/react-cond.svg)](http://badge.fury.io/js/react-cond)
[![Stability: unstable](https://img.shields.io/badge/stability-unstable-yellowgreen.svg)](https://github.com/stoeffel/react-cond/milestones/1.0)

Make conditional rendering in react simple and expressive. `react-cond` is implemented as a component, which takes n **clauses** as its children. Each **clause** is an array with a **condition** and a component. The first child-component, where the **condition** evaluates to `true` gets rendered in a `Cond` component.

### Before
```jsx
const List = React.createClass({
  // ...
  render() {
    const { isLoading, hasErrors, noSearchResult, items } = this.state;

    return (
      <ul>
        { isLoading? <Spinner />
          : hasErrors? <Error />
          : noSearchResult || items.length <= 0? <NotingFound />
          : items }
      </ul>
    );
  }
});
```

### After
```jsx
import { Cond, eq, T as otherwise } from 'react-cond';

const List = React.createClass({
  // ...
  render() {
    const { items } = this.state;

    return (
      <ul>
        <Cond value={this.state}>
          {ifIsLoading}
          {ifHasErrors}
          {ifNoSearchResult}
          {[ otherwise, items ]}
        </Cond>
      </ul>
    );
  }
});

const ifIsLoading = [ eq('isLoading', true), <Spinner /> ];
const ifHasErrors = [ eq('hasErrors', true), <Error /> ];
const ifNoSearchResult = [
  ({ noSearchResult, items }) => noSearchResult || items.length <= 0
  , <NotingFound />
];
```

## Usage
<p align="center">
  <a href="#installation">Installation</a> |
  <a href="#importing">Importing</a> |
  <a href="#the-component-cond">The Component `Cond`</a> |
  <a href="#clauses">Clauses</a> |
  <a href="#helper-functions">Helper Functions</a>
</p>

### Installation

```
$ npm install --save react-cond
```

### Importing

`React-cond` exports the component `Cond` and a function `T`.

```js
import { Cond, T } from 'react-cond';
// or the old way
var reactCond = require('react-cond');
var Cond = reactCond.Cond;
var T = reactCond.T;
```

### The Component `Cond`

`Cond` is a react component, which controlles rendering of it's child components.

```jsx
<Cond value={nr}>
  {[ T, <p key="always-true">always rendered</p> ]}
</Cond>
```

### Clauses

The `Cond` component wraps n **clauses**.
Each **clause** has the following format:
`{[ condition, <Component /> ]}` f.e. `{[ x=> x > 0, <Positive /> ]}`

```jsx
import { Cond, T } from 'react-cond';
// ...

<Cond value={nr}>
  {[ x => x > 0, <Positive /> ]}
  {[ x => x < 0, <Negative /> ]}
  {[ T, <Zero /> ]} // `T` always evaluates to true. see Helper Functions.
</Cond>
```

### Helper Functions
<p align="center">
  <a href="#t">T</a> |
  <a href="#eq">eq</a> |
  <a href="#not">not</a> |
  <a href="#gt">gt</a> |
  <a href="#lt">lt</a> |
  <a href="#gte">gte</a> |
  <a href="#lte">lte</a> |
  <a href="#between">between</a> |
  <a href="#and">and</a> |
  <a href="#or">or</a> |
  <a href="#value">value</a>
</p>

The following helper functions are optional, but allow you to write even more expressive conditions for your clauses.

#### T

`T`

Can be used as an otherwise or else clause. It always evaluates to `true`.

```jsx
import { Cond, T } from 'react-cond';
// or youe can import T as otherwise.
import { Cond, T as otherwise } from 'react-cond';

<Cond value={'_test_'}>
  {/* ... your clauses ... */}
  {[ T, <h1>otherwise</h1>]}
</Cond>
```

#### eq

`eq([property:String], value:Any)`

Condition to test if the value is equal (`===`) to a given value.

```jsx
import { Cond, eq } from 'react-cond';

<Cond value={this.state.nr}>
  {[ eq(42), <h1>nr is 42</h1>]}
</Cond>
```

#### not

`not(condition:Function)`

Inverts a condition. Can be used to test if a value is not equal (`!==`) to a given value.

```jsx
import { Cond, eq, not } from 'react-cond';

<Cond value={this.state.nr}>
  {[ not(eq(42)), <h1>nr isn't 42</h1>]}
</Cond>
```

#### gt

`gt([property:String], value:Any)`

Condition to test if the value is greater than (`>`) a given value.

```jsx
import { Cond, gt } from 'react-cond';

<Cond value={this.state.nr}>
  {[ gt(42), <h1>nr greater than 42</h1>]}
</Cond>
```

#### lt

`lt([property:String], value:Any)`

Condition to test if the value is lower than (`<`) a given value.

```jsx
import { Cond, lt } from 'react-cond';

<Cond value={this.state.nr}>
  {[ lt(42), <h1>nr lower than 42</h1>]}
</Cond>
```

#### gte

`gte([property:String], value:Any)`

Condition to test if the value is greater or equal than (`>=`) a given value.

```jsx
import { Cond, gte } from 'react-cond';

<Cond value={this.state.nr}>
  {[ gte(42), <h1>nr greater or equal than 42</h1>]}
</Cond>
```

#### lte

`lte([property:String], value:Any)`

Condition to test if the value is lower or equal than (`<=`) a given value.

```jsx
import { Cond, lte } from 'react-cond';

<Cond value={this.state.nr}>
  {[ lte(42), <h1>nr lower or equal than 42</h1>]}
</Cond>
```

#### between

`between([property:String], value:Any)`

Condition to test if the value is between two given values.

```jsx
import { Cond, between } from 'react-cond';

<Cond value={this.state.nr}>
  {[ between(1, 10), <h1>nr between 1 and 10</h1>]}
</Cond>
```


#### and

`and(condition:Function, condition:Function)`

Combine two conditions with a logical and (`&&`).

```jsx
import { Cond, and, eq } from 'react-cond';

const startsWith = x => str => str.startsWith(x);
const endsWith = x => str => str.endsWith(x);

<Cond value={str}>
  {[ and(startsWith('-'), endsWith('-')), <h1>string starts and ends with a dash</h1>]}
</Cond>
```

#### or

`or(condition:Function, condition:Function)`

Combine two conditions with a logical or (`||`).

```jsx
import { Cond, or, eq } from 'react-cond';

const startsWith = x => str => str.startsWith(x);
const endsWith = x => str => str.endsWith(x);

<Cond value={str}>
  {[ or(startsWith('-'), endsWith('-')), <h1>string starts or ends with a dash</h1>]}
</Cond>
```

#### value

`value(property:String, condition:Function)`

If your conditions depend on multiple values you can pass an object to the `value` `prop`
and use `value` to access them.

```jsx
<Cond value={{ val1:12, val2: 13 }}>
	{[ and(value('val1', eq(11)), value('val2', eq(12))), <h1>unexpected</h1>]}
	{[ and(value('val1', eq(12)), value('val2', eq(13))), <h1>expected</h1>]}
	{[ T, <h1>unexpected</h1>]}
</Cond>
```

## License

MIT © [Christoph Hermann](http://stoeffel.github.io)
