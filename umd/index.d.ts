export interface TinySubscribe<T> {
    unsubscribe: () => TinySubscribe<T>;
    next: (state?: T) => TinySubscribe<T>;
}
export declare function Subject<T>(initState: T): {
    state: T;
    events: Function[];
    next: (state?: T | undefined) => void;
    setState: (fn: (state: T) => any) => void;
    subscribe: (fn: (state: T) => any) => TinySubscribe<T>;
    subscribeMemo: (memo: (state: T) => any[], fn: (state: T) => any) => TinySubscribe<T>;
};
export interface ConsumerProps<T> {
    key?: any;
    ref?: any;
    meno?: (s: T) => any[];
    children: (s: T) => any;
}
export declare function allowImmer(immer: any): void;
declare type IUseObFn<T> = (props: ConsumerProps<T>) => any;
export interface UseObser<T, A> extends IUseObFn<T> {
    get: () => T;
    set: (fn: (v: T) => any) => any;
    next: () => any;
    useState: (memo?: (s: T) => any[], autoFn?: Function[]) => T;
    fn: A;
}
export default function reactOb<T, A>(initState: T, actions: A): UseObser<T, A>;
export {};
