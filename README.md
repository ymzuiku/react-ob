# react-ob

- Olny 0.4kb(gzip)
- Only 4 API:
  - Observer
  - useObserver
  - Consumer
  - next
- Use typescript

## Install

```sh
$ npm install --save react-ob
```

## Use Hooks style

```js
import { Observer, UseObserver } from "react-ob";

const data = Observer({ age: 5, text: "hello" });

const Button = () => {
  // only update when s.age change
  const { age } = useObserver(data, (s) => [s.age]);
  return (
    <button
      onClick={() => {
        useObserver.state.age += 1;
        useObserver.next();
      }}
    >
      add num
    </button>
  );
};

const Input = () => {
  // only update when s.text change
  const { text } = useObserver(data, (s) => [s.text]);
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
import { Observer, Consumer } from "react-ob";

const data = Observer({ text: "please input" });

export default () => {
  return (
    <div>
      <Consumer
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
