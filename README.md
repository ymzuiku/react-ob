# react-ob

- Olny 0.4kb(gzip)
- Only 4 Core API:
  - CreateObserver
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
import { CreateObserver, UseObserver } from "react-ob";

const data = CreateObserver({ age: 5, text: "hello" });

const Button = () => {
  // only update when s.age change
  const { age } = useObserver(data, (s) => [s.age]);
  return (
    <button
      onClick={() => {
        data.next((s) => {
          s.age += 1;
        });
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
          data.next((s) => {
            s.text = e.currentTarget.value;
          });
        }}
      />
    </div>
  );
};
```

## Use Consumer style

```js
import { CreateObserver, Consumer } from "react-ob";

const data = CreateObserver({ text: "please input" });

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
          data.next((s) => {
            s.text = e.currentTarget.value;
          });
        }}
      />
    </div>
  );
};
```
