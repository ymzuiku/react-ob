# only-subscribe

Only use subscribe do react state

## start

1. Add `SubscribeProvider` in App.tsx

```jsx
<SubscribeProvider>
  <App />
</SubscribeProvider>
```

2. Use `channel` and `Subscribe` in Page

```jsx
function Page() {
  const value = useRef(channel(10)).current;

  return (
    <div>
      <Subscribe channels={[value]}>
        {(value) => <div>num: {value}</div>}
      </Subscribe>
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
      {(name) => <div>User name: {name}</div>}
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
      {(name) => <div>User name: {name}</div>}
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
