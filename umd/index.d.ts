export interface UseOBOptions<A> {
    actions?: A;
    immer?: any;
}
export default function reactOb<T, A>(initState: T, options?: UseOBOptions<A>): {
    (memo?: ((s: T) => any[]) | undefined, autoFn?: Function[] | undefined): T;
    getBaseState(): T;
    get(): T;
    set(fn: (s: T) => any): void;
    next(): void;
    fn: A;
};
