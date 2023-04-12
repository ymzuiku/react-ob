# react-ob

Only use observer do react state, only 0.4kb in gzip.

## start

1. Add `ObProvider` in App.tsx

```jsx
<ObProvider>
  <App />
</ObProvider>
```

2. Use `useChannel` and `Ob` in Page

```jsx
function Page() {
  const value = useChannel(0);

  return (
    <div>
      <Ob channels={[value]}>{(value) => <div>num: {value}</div>}</Ob>
      <button onClick={() => value.set(value() + 1)}></button>
    </div>
  );
}
```

3. Use global `channel`:

```jsx
const name = channel("");

function UserPage() {
  return (
    <Subscribe channels={[name]}>
      {(_name) => <div>User name: {_name}</div>}
    </Subscribe>
  );
}

function UserSettingPage() {
  return (
    <div>
      <div> setting username:</div>
      <input onChange={(e) => name.set(e.target.value)} />
    </div>
  );
}
```

3. Use localStorage `channel`:

```jsx
const name = channelWithStorage("user-name", "");

function UserPage() {
  return (
    <Subscribe channels={[name]}>
      {(_name) => <div>User name: {_name}</div>}
    </Subscribe>
  );
}

function UserSettingPage() {
  return (
    <div>
      <div> setting username:</div>
      <input onChange={(e) => name.set(e.target.value)} />
    </div>
  );
}
```
