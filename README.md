# react-ob

- Olny 0.4kb(gzip)
- Only 4 API:
  - Ob
  - useOb
  - Ober
  - next
- Use typescript

## Install

```sh
$ npm install --save react-ob
```

## Use Hooks style

```js
import { Ob, UseOb } from "react-ob";

const data = Ob({ age: 5, text: "hello" });

const Button = () => {
  // only update when s.age change
  const { age } = useOb(data, (s) => [s.age]);
  return (
    <button
      onClick={() => {
        useOb.state.age += 1;
        useOb.next();
      }}
    >
      add num
    </button>
  );
};

const Input = () => {
  // only update when s.text change
  const { text } = useOb(data, (s) => [s.text]);
  return (
    <div>
      <div>{text}</div>
      <input
        placeholder="inputA..."
        onInput={(e) => {
          useOb.state.text = e.currentTarget.value;
          useOb.next();
        }}
      />
    </div>
  );
};
```

## Use Consumer style

```js
import { Ob, Ober } from "react-ob";

const data = Ob({ text: "please input" });

export default () => {
  return (
    <div>
      <Ober
        data={data}
        memo={(s) => [s.text]}
        render={(s) => <div>{s.text}</div>}
      />
      <input
        placeholder="inputA..."
        onInput={(e) => {
          useOb.state.text = e.currentTarget.value;
          useOb.next();
        }}
      />
    </div>
  );
};
```
