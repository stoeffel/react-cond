<h1 align="center">react-cond</h1>

<p align="center">

  <a href="#usage">Usage</a> |
  <a href="#license">License</a>
  <br><br>
  <img align="center" src="http://33.media.tumblr.com/cc0170c0a46e44f05347ed5e6197ef4c/tumblr_mv2pp0cnrV1qcung4o1_400.gif">
  <br>
  <sub>logo by <a href="http://justinmezzell.tumblr.com/">Justin Mezzell</a></sub>
  <blockquote align="center"><a href="http://www.cis.upenn.edu/~matuszek/LispText/lisp-cond.html">Lisp-Style</a> conditional rendering in react.</blockquote>
  <a href="https://travis-ci.org/stoeffel/react-cond"><img align="center" src="https://travis-ci.org/stoeffel/react-cond.svg?branch=master"></a>
</p>

Make conditional rendering in react simple and expressive. `react-cond` is implemented as a component, which takes n **clauses** as its children. Each **clause** is an array with a **condition** and a component. The first child-component, where the **condition** evaluates to `true` gets rendered in a `Cond` component.

## Usage
<p align="center">

  <a href="#installation">Installation</a> |
  <a href="#importing">Importing</a> |
  <a href="#the-component-cond">The Component `Cond`</a> |
  <a href="#clauses">Clauses</a> |
  <a href="#condition-helpers">Condition Helpers</a>
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

### Condition Helpers

eq, gt, lt, ...

## License

MIT © [Christoph Hermann](http://stoeffel.github.io)
