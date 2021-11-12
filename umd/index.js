(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('immer')) :
  typeof define === 'function' && define.amd ? define(['react', 'immer'], factory) :
  (global = global || self, global.reactOb = factory(global.react, global.immer));
}(this, function (react, immer) { 'use strict';

  immer = immer && immer.hasOwnProperty('default') ? immer['default'] : immer;

  function Subject(initState) {
      var ref = {
          state: initState,
          events: [],
          next: function (state) {
              ref.events.forEach(function (fn) {
                  fn(state || ref.state);
              });
          },
          setState: function (fn) {
              fn(ref.state);
              ref.next(ref.state);
          },
          subscribe: function (fn) {
              ref.events.push(fn);
              var scribe = {
                  unsubscribe: function () {
                      var nextEvents = [];
                      ref.events.forEach(function (v) {
                          if (v !== fn) {
                              nextEvents.push(v);
                          }
                      });
                      ref.events = nextEvents;
                      return scribe;
                  },
                  next: function (state) {
                      fn(state || ref.state);
                      return scribe;
                  },
              };
              return scribe;
          },
          subscribeMemo: function (memo, fn) {
              var last = ref.state ? memo(ref.state) : [];
              var len = last.length;
              var sub = ref.subscribe(function (theState) {
                  var current = memo(theState);
                  var isKeep = true;
                  for (var i = 0; i < len; i++) {
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
              sub.next = function (s) { return fn(s || ref.state); };
              return sub;
          },
      };
      return ref;
  }

  function reactOb(initState, setActions) {
      var subject = Subject(initState);
      function useOb(memo) {
          var _a = react.useState(subject.state), state = _a[0], setState = _a[1];
          react.useEffect(function () {
              var unsub;
              unsub = subject.subscribeMemo(memo, setState);
              return function () {
                  unsub.unsubscribe();
              };
          }, []);
          return state;
      }
      function next(fn) {
          subject.state = immer(subject.state, function (draft) {
              fn(draft);
          });
          subject.next();
      }
      var baseStateTxt = JSON.stringify(initState);
      function Consumer(_a) {
          var children = _a.children, memo = _a.memo;
          return children(useOb(memo));
      }
      // Consumer.next = next;
      Consumer.actions = setActions(next);
      Consumer.state = function () { return subject.state; };
      Consumer.baseState = function () {
          return JSON.parse(baseStateTxt);
      };
      Consumer.useState = useOb;
      return Consumer;
  }

  return reactOb;

}));
//# sourceMappingURL=index.js.map
