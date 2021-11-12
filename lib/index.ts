import { useState, useEffect } from "react";
import immer from "immer";
import { Subject } from "./Subscribe";

type IUseObFn<T> = (props: ConsumerProps<T>) => any;

export interface UseObser<T, A> extends IUseObFn<T> {
  baseState: () => T;
  state: () => T;
  // next: (fn: (v: T) => any) => any;
  useState: (memo: (s: T) => any[]) => T;
  actions: A;
}

export interface ConsumerProps<T> {
  key?: any;
  ref?: any;
  memo: (s: T) => any[];
  children: (s: T) => any;
}

export default function reactOb<T, A>(
  initState: T,
  setActions: (next: (fn: (v: T) => any) => any) => A
) {
  const subject = Subject(initState);

  function useOb(memo: (s: T) => any[]): T {
    const [state, setState] = useState(subject.state);

    useEffect(() => {
      let unsub: any;
      unsub = subject.subscribeMemo(memo, setState);

      return () => {
        unsub.unsubscribe();
      };
    }, []);

    return state;
  }

  function next(fn: (s: T) => any) {
    subject.state = immer(subject.state, (draft: T) => {
      fn(draft as any);
    });

    subject.next();
  }

  const baseStateTxt = JSON.stringify(initState);

  function Consumer({ children, memo }: ConsumerProps<T>) {
    return children(useOb(memo));
  }
  // Consumer.next = next;
  Consumer.actions = setActions(next);
  Consumer.state = () => subject.state;
  Consumer.baseState = (): T => {
    return JSON.parse(baseStateTxt);
  };
  Consumer.useState = useOb;

  return Consumer;
}
