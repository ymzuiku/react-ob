export interface TinySubscribe<T> {
  unsubscribe: () => TinySubscribe<T>;
  next: (state?: T) => TinySubscribe<T>;
}

export function Subject<T>(initState: T) {
  const ref = {
    state: initState,
    events: [] as Function[],
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

    subscribeMemo: (memo: (state: T) => any[], fn: (state: T) => any) => {
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
    },
  };
  return ref;
}
