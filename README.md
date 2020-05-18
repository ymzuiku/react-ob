# react-ob

> Use react-hooks ad observer, use immer create immertable global state

> Use typescript

## Install

```sh
$ npm install --save react-ob
```

## Simple Example

// create useOb.js

```js
import Ob from "react-ob";

const useOb = Ob(
  { name: "dog", age: 20 },
  {
    addAge: (n) => {
      useOb.set((s) => (s.age += n));
    },
  }
);
```

// create index.jsx

```js
import useOb from "./useOb";

export default () => {
  const data = useOb();

  console.log("rerender at button click");

  return (
    <div>
      <h2>age: {data.age}</h2>
      <button onClick={() => data.fn.addAge(5)}>add num</button>
    </div>
  );
};
```

// A component:

```js
import useOb from "./useOb";

export default () => {
  // only update at s.name change:
  const data = useOb((s) => [s.name]);

  console.log("render once");

  return (
    <div>
      <h2>name: {data.name}</h2>
      <button onClick={() => data.fn.addAge(5)}>add num</button>
    </div>
  );
};
```
