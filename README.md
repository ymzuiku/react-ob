# react-ob

> Use react-hooks ad observer, use immer create immertable global state

> Use typescript

## Install

```sh
$ npm install --save react-ob
# If use preact:
$ npm install --save preact-ob
```

## Simple Example

// create useOb.js

```js
import Ob from "react-ob";
// if use preact

const HumanOb = Ob(
  { name: "dog", age: 20 },
  {
    addAge: (n = 1) => {
      HumanOb.set((s) => (s.age += n));
    },
  }
);
```


## Use Memo by state

// create index.jsx

```js
import HumanOb from "./HumanOb";

export default () => {
  // only update at s.name change:
  const state = HumanOb.useState((s) => [s.name]);

  console.log("render once");

  return (
    <div>
      <h2>name: {state.name}</h2>
      <button onClick={() => HumanOb.fn.addAge(5)}>add num</button>
    </div>
  );
};
```

## Use Consumer style

```js
import HumanOb from "./HumanOb";

export default () => {
  console.log("render once");
  return (
    <div>
      <h2>hello</h2>
      <!-- only rerender this Element -->
      <HumanOb memo={s=>[s.age]}>{(state) => <div>{state.age}</div>}</HumanOb>
      <button onClick={HumanOb.fn.addAge}>add Humber</button>
    </div>
  );
};
```
