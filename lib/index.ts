import { useEffect, useMemo, useRef, useState } from "react";
import { isEqual } from "./isEqual";

export { isEqual };

export interface ConsumerProps<T> {
  key?: unknown;
  ref?: unknown;
  data: ObControl<T>;
  memo: (s: T) => unknown[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (s: T) => any;
}

export interface ObControl<T> {
  val: T;
  next: (fn?: (state: T) => void) => void;
  subscribs: Set<() => void>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ObControlAny = ObControl<any>;

export function useObserver<T>(data: ObControl<T>, memo: (s: T) => unknown[]): T {
  const [nextState, setState] = useState(data.val);
  const ref = useRef(memo(data.val));

  useEffect(() => {
    const fn = () => {
      let needUpdate = false;
      const list = memo(data.val);

      for (let i = 0; i < list.length; i++) {
        if (isEqual(list[i], ref.current[i])) {
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

export function Consumer<T>({ data, children, memo }: ConsumerProps<T>) {
  const state = useObserver(data, memo);
  return children(state);
}

export function CreateObserver<T>(initState: T): ObControl<T> {
  const fns = new Set<() => void>();

  const out = {
    subscribs: fns,
    next: (fn?: (s: T) => void) => {
      if (fn) {
        Promise.resolve(fn(out.val)).then(() => {
          fns.forEach((fn) => fn());
        });
      } else {
        fns.forEach((fn) => fn());
      }
    },
    val: initState,
  };
  return out;
}

export function useCreateObserver<T>(data: T, memo: unknown[]) {
  return useMemo(() => CreateObserver(data), memo);
}
