import { useEffect, useRef, useState } from "react";

export interface ConsumerProps<T> {
  key?: unknown;
  ref?: unknown;
  data: Ob<T>;
  memo: (s: T) => unknown[];
  render: (s: T) => JSX.Element;
}

interface Ob<T> {
  val: T;
  next: () => void;
  subscribs: Set<() => void>;
}

export function useObserver<T>(data: Ob<T>, memo: (s: T) => unknown[]): T {
  const [nextState, setState] = useState(data.val);
  const ref = useRef(memo(data.val));

  useEffect(() => {
    const fn = () => {
      let needUpdate = false;
      const list = memo(data.val);

      for (let i = 0; i < list.length; i++) {
        if (list[i] !== ref.current[i]) {
          needUpdate = true;
          break;
        }
      }
      ref.current = list;
      if (needUpdate) {
        setState({ ...data.val });
      }
    };
    data.subscribs.add(fn);
    return () => {
      data.subscribs.delete(fn);
    };
  }, []);

  return nextState;
}

export function Consumer<T>({ data, render, memo }: ConsumerProps<T>) {
  const state = useObserver(data, memo);
  return render(state);
}

export function Observer<T>(initState: T) {
  const fns = new Set<() => void>();

  return {
    subscribs: fns,
    next: () => {
      fns.forEach((fn) => fn());
    },
    val: initState,
  };
}
