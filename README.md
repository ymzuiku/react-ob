# react-ob

> Use react-hooks ad observer, use immer create immertable global state

> Use typescript

## Install

```sh
$ npm install --save react-ob
```

## Simple Example

// create Ob.js

```js
import reactOb from "react-ob";
// if use preact

const Ob = reactOb(
  { name: "dog", age: 20 },
  (next)=>{
    addAge: (n = 1) => {
      next((s) => (s.age += n));
    },
  }
);
```

## Use Memo by state

// create index.jsx

```js
import Ob from "./Ob";

export default () => {
  // only update at s.name change:
  const state = Ob.useState((s) => [s.name]);

  console.log("render once");

  return (
    <div>
      <h2>name: {state.name}</h2>
      <button onClick={() => Ob.actions.addAge(5)}>add num</button>
    </div>
  );
};
```

## Use Consumer style

```js
import Ob from "./Ob";

export default () => {
  console.log("render once");
  return (
    <div>
      <h2>hello</h2>
      <!-- only rerender this Element -->
      <Ob memo={s=>[s.age]}>{(state) => <div>{state.age}</div>}</Ob>
      <button onClick={Ob.actions.addAge}>add Humber</button>
    </div>
  );
};
```
