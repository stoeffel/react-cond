# react-cond [![Build Status](https://travis-ci.org/stoeffel/react-cond.svg?branch=master)](https://travis-ci.org/stoeffel/react-cond)

> Lisp-Style conditional rendering in react.

Make conditional rendering in react simple and expressive. `react-cond` is implemented as a component, which takes n **clauses** as its children. Each **clause** is an array with a **condition** and a component. The first child-component, where the **condition** evaluates to `true` gets rendered in a `Cond` component.

## Install

```
$ npm install --save react-cond
```


## Usage

### Importing

`React-cond` exports the component `Cond` and a function `T`.

```js
import { Cond, T } from 'react-cond';
// or the old way
var reactCond = require('react-cond');
var Cond = reactCond.Cond;
var T = reactCond.T;
```

### Cond

`Cond` is a react component, which controlles rendering of it's child components.

```jsx
<Cond value={nr}>
  {[ T, <p key="always-true">always rendered</p> ]}
</cond>
```

### Clauses

The `Cond` component wraps n **clauses**.
Each **clause** has the following format:
`{[ condition, <Component /> ]}` f.e. `{[ x=> x > 0, <Positive /> ]}`

## License

MIT © [Christoph Hermann](http://stoeffel.github.io)
