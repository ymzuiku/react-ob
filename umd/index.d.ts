export default function reactOb<T, A>(initState: T, fn?: A): {
    (memo?: ((s: T) => any[]) | undefined): T;
    getBaseState(): T;
    State: T;
    set(fn: (s: T) => any): void;
    fn: A | undefined;
};
export declare type UseStoreFetcher<T> = (p: any, s: T) => Promise<T>;
