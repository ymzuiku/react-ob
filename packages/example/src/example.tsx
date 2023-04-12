import { useRef } from "react";
import {
  Channel,
  Ob,
  ObProvider,
  channelWithStorage,
  publish,
  useChannel,
} from "react-ob";

function Dog({ value, num }: { value: Channel<number>; num: Channel<number> }) {
  const self = useChannel(0);
  const valueDouble = useRef(() => value() * 2).current;
  return (
    <div>
      <Ob channels={[value, valueDouble]}>
        {(v, b) => (
          <div
            style={{
              fontSize: v + 10,
            }}
          >
            Dog: {v} {b} : {new Date().toISOString()}
            <Ob channels={[self]}>{(s) => <div>self:{s}</div>}</Ob>
            <Ob channels={[num]}>
              {(v) => (
                <div
                  style={{
                    fontSize: v + 10,
                  }}
                >
                  only:number: {v} : {new Date().toISOString()}
                </div>
              )}
            </Ob>
          </div>
        )}
      </Ob>
      <button onClick={() => self.set(self() + 1)}>add-self</button>
    </div>
  );
}

function Anime({ value, num }: any) {
  return (
    <Ob channels={[value]}>{() => <Dog value={value} num={num}></Dog>}</Ob>
  );
}

const num = channelWithStorage("dog", 0);

const name = channelWithStorage("user-name", "");

function UserPage() {
  return <Ob channels={[name]}>{(name) => <div>User name: {name}</div>}</Ob>;
}

function UserSettingPage() {
  return (
    <div>
      <div> setting username:</div>
      <Ob channels={[name]}>
        {(v) => <input value={v} onChange={(e) => name.set(e.target.value)} />}
      </Ob>
    </div>
  );
}

export function Example() {
  let value = useChannel(10);

  return (
    <ObProvider>
      <div>
        pgae-time: {Date.now()}
        <Dog value={value} num={num}></Dog>
        <Anime value={value} num={num} />
        <button onClick={() => value.set(value() + 1)}>add value</button>
        <button onClick={() => num.set(num() + 1)}>add num</button>
        <button onClick={() => num.set(5)}>add clear num</button>
        <button onClick={() => publish.forceUpdate()}>forceUpdate</button>
        <UserPage />
        <UserSettingPage />
      </div>
    </ObProvider>
  );
}
