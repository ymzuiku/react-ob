# react-ob

- Olny 0.4kb(gzip)
- Only 3 API:
  - useOb
  - useOb.ob
  - useOb.next
- Use typescript

## Install

```sh
$ npm install --save react-ob
```

## Use Hooks style

```js
import reactOb from "react-ob";

const useOb = reactOb({ age: 5, text: "hello" });

const Button = () => {
  // only update when s.age change
  const { age } = useOb((s) => [s.age]);
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
  const { text } = useOb((s) => [s.text]);
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
import reactOb from "react-ob";

const useOb = reactOb({ text: "please input" });

export default () => {
  return (
    <div>
      <useOb.ob memo={(s) => [s.text]} render={(s) => <div>{s.text}</div>} />
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
