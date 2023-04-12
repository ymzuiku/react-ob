/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  createContext,
  createElement,
  useContext,
  useMemo,
  useState,
} from "react";

import { publish } from "./publish";
import { ChannelArgs, ChannelInputs } from "./types";

const ObContext = createContext(0);

export function Ob<T extends ChannelInputs>({
  children,
  channels,
}: {
  children: (...args: ChannelArgs<T>) => any;
  channels: T;
}) {
  useContext(ObContext);
  const nextValues = channels.map((v) => v());
  return useMemo(() => (children as any)(...nextValues), nextValues);
}

export function ObProvider({ children }: { children: any }) {
  const [state, setState] = useState(0);
  publish.fn = () => {
    setState((v) => {
      v += 1;
      if (v > 9999) {
        v = 0;
      }
      return v;
    });
  };
  return createElement(ObContext.Provider, { children, value: state });
}
