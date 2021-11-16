import { useState, useEffect } from 'react';
import immer from 'immer';

function Subject(initState) {
    var ref = {
        state: initState,
        events: new Set([]),
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
            ref.events.add(fn);
            var scribe = {
                unsubscribe: function () {
                    ref.events.delete(fn);
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
        var _a = useState(subject.state), state = _a[0], setState = _a[1];
        useEffect(function () {
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

export default reactOb;
//# sourceMappingURL=index.js.map