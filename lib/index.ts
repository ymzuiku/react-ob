import { useEffect, useRef, useState } from "react";

export interface ConsumerProps<T> {
  key?: unknown;
  ref?: unknown;
  memo: (s: T) => unknown[];
  render: (s: T) => JSX.Element;
}

export function reactOb<T>(initState: T) {
  const fns = new Set<() => void>();
  function useOb(memo: (s: T) => unknown[]): T {
    const [nextState, setState] = useState(useOb.state);
    const ref = useRef(memo(useOb.state));

    useEffect(() => {
      const fn = () => {
        const list = memo(useOb.state);

        let needUpdate = false;
        for (let i = 0; i < list.length; i++) {
          if (list[i] !== ref.current[i]) {
            needUpdate = true;
            break;
          }
        }
        ref.current = list;
        if (needUpdate) {
          setState({ ...useOb.state });
        }
      };
      fns.add(fn);
      return () => {
        fns.delete(fn);
      };
    }, []);

    return nextState;
  }

  function Ob({ render, memo }: ConsumerProps<T>) {
    const state = useOb(memo);
    return render(state);
  }

  useOb.next = () => {
    fns.forEach((fn) => fn());
  };
  useOb.state = initState;
  useOb.ob = Ob;

  return useOb;
}
