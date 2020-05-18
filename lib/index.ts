import { useState, useEffect } from "react";
import TinySubject from "tiny-subject";
import immer from "immer";

export default function reactOb<T, A>(initState: T, fn?: A) {
  const subject = new TinySubject(initState);
  type Updater = (s: T) => any;

  function useOb(memo?: (s: T) => any[]): T {
    const [state, setState] = useState(subject.state);

    useEffect(() => {
      let unsub: any;

      if (memo) {
        unsub = subject.subscribeMemo(memo, (s) => {
          setState(s);
        });
      } else {
        unsub = subject.subscribe((s) => {
          setState(s);
        });
      }

      return () => {
        unsub.unsubscribe();
      };
    }, []);

    return state;
  }

  const baseState = JSON.parse(JSON.stringify(initState));

  useOb.getBaseState = (): T => {
    return JSON.parse(JSON.stringify(baseState));
  };

  useOb.State = initState;

  useOb.set = function (fn: Updater) {
    subject.state = immer<T>(subject.state, (draft) => {
      fn(draft as any);
    });
    subject.next();
  };

  useOb.fn = fn;

  return useOb;
}

export type UseStoreFetcher<T> = (p: any, s: T) => Promise<T>;
