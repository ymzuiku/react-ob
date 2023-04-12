import { useRef } from "react";
import { publish } from "./publish";

export interface Channel<T> {
  (): T;
  set: (v: T) => unknown;
}

export function channel<T>(value: T): Channel<T> {
  let cache = value;
  const ch = () => {
    return cache;
  };
  ch.set = (v: T) => {
    cache = v;
    publish();
  };
  return ch;
}

export function useChannel<T>(value: T): Channel<T> {
  return useRef(channel(value)).current;
}

export function isChannel(value: any) {
  return typeof value === "function" && typeof value.set === "function";
}

function localStorageGet(key: string) {
  if (typeof window === "undefined") {
    return void 0;
  }
  const v = localStorage.getItem(key);
  if (!v) {
    return void 0;
  }
  try {
    return JSON.parse(v).j;
  } catch (e) {
    return void 0;
  }
}

function localStorageSet(key: string, value: any) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(key, JSON.stringify({ j: value }));
}

export function channelWithStorage<T>(key: string, value: T): Channel<T> {
  let cache = value;
  let isLoadedStorage = false;
  const ch = () => {
    if (!isLoadedStorage) {
      const old = localStorageGet(key);
      if (old !== void 0) {
        isLoadedStorage = true;
        cache = old;
        publish();
      }
    }
    return cache;
  };
  ch.set = (v: T) => {
    cache = v;
    publish();
    localStorageSet(key, cache);
  };
  return ch;
}
