import { useState, useEffect } from "react";

export interface TinySubscribe<T> {
  unsubscribe: () => TinySubscribe<T>;
  next: (state?: T) => TinySubscribe<T>;
}

export function Subject<T>(initState:T) {
  const ref = {
    state:initState, 
    events:[] as Function[],
    next: (state?: T) => {
      ref.events.forEach((fn) => {
        fn(state || ref.state);
      });
    },
    setState: (fn: (state: T) => any) => {
      fn(ref.state);
      ref.next(ref.state);
    },
    subscribe: (fn: (state: T) => any): TinySubscribe<T> => {
      ref.events.push(fn);
      const scribe = {
        unsubscribe: () => {
          const nextEvents: Function[] = [];
          ref.events.forEach((v) => {
            if (v !== fn) {
              nextEvents.push(v);
            }
          });
          ref.events = nextEvents;
          return scribe;
        },
        next: (state?: T) => {
          fn(state || ref.state);
          return scribe;
        },
      };
  
      return scribe;
    },
  
    subscribeMemo : (memo: (state: T) => any[], fn: (state: T) => any) => {
      let last = ref.state ? memo(ref.state) : [];
      const len = last.length;
      const sub = ref.subscribe((theState) => {
        const current = memo(theState);
        let isKeep = true;
        for (let i = 0; i < len; i++) {
          if (current[i] !== last[i]) {
            isKeep = false;
            break;
          }
        }
        if (isKeep) {
          return;
        }
        fn(theState);
        last = current;
      });
      sub.next = (s) => fn(s || ref.state);
      return sub;
    }
  }
  return ref;
}

export interface ConsumerProps<T> {
  key?:any;
  ref?:any;
  meno?: (s:T)=> any[];
  children:(s:T)=>any;
}

const libray = {
  immer:null as any
}

export function allowImmer(immer:any){
  libray.immer = immer;
}


type IUseObFn<T> = (props:ConsumerProps<T>)=> any

export interface UseObser<T,A> extends IUseObFn<T> {
  get:()=>T;
  set:(fn:(v:T)=>any)=>any;
  next:()=>any;
  useState: (memo?: (s: T) => any[], autoFn?: Function[])=> T;
  fn:A;
}



export default function reactOb<T, A>(
  initState: T,
  actions: A,
):UseObser<T, A> {
  const subject = Subject(initState);
  type Updater = (s: T) => any;

  function use(memo?: (s: T) => any[], autoFn?: Function[]): T {
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

  const useOb = function Consumer({ children }: ConsumerProps<T>) {
    const ob = use();
    return children(ob)
  }

  const baseState = JSON.parse(JSON.stringify(initState));

  useOb.getBaseState = (): T => {
    return JSON.parse(JSON.stringify(baseState));
  };

  useOb.get = () => subject.state;

  useOb.set = function (fn: Updater) {
    if (libray.immer) {
      subject.state = libray.immer(subject.state, (draft: T) => {
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
  useOb.useState = use;

  

  return useOb;
}
