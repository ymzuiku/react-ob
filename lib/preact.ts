import { useState, useEffect } from "preact/hooks";
import TinySubject from "tiny-subject";

export interface UseOBOptions<A> {
  actions?: A;
  immer?: any;
}

export default function reactOb<T, A>(
  initState: T,
  options: UseOBOptions<A> = {}
) {
  const { actions = {}, immer } = options;
  const subject = new TinySubject(initState);
  type Updater = (s: T) => any;

  function useOb(memo?: (s: T) => any[], autoFn?: Function[]): T {
    const [state, setState] = useState(subject.state);

    useEffect(() => {
      if (autoFn) {
        autoFn.forEach(async (fn) => {
          const backFn = await Promise.resolve(fn);
          if (typeof backFn === "function") {
            backFn();
          }
        });
      }
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

  useOb.get = () => subject.state;

  useOb.set = function (fn: Updater) {
    if (immer) {
      subject.state = immer(subject.state, (draft: T) => {
        fn(draft as any);
      });
    } else {
      fn(subject.state);
      subject.state = { ...subject.state };
    }

    subject.next();
  };
  useOb.next = () => useOb.set(() => {});

  useOb.fn = actions as A;

  return useOb;
}
