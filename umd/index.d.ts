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
