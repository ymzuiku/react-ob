/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, ReactNode, createContext, createElement, useContext, useMemo, useState } from "react";

import { publish } from "./publish";
import { ChannelArgs, ChannelInputs } from "./types";

const ObContext = createContext(0);

export interface ObProps<T extends ChannelInputs> {
  children: (...args: ChannelArgs<T>) => any;
  channels: T;
}

export function Ob<T extends ChannelInputs>({ children, channels }: ObProps<T>) {
  useContext(ObContext);
  const nextValues = channels.map((v) => v());
  return useMemo(() => (children as any)(...nextValues), nextValues);
}

export function ObProvider({ children }: { children: any }) {
  const [state, setState] = useState(0);
  publish.update = () => {
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

export class ObProvider2 extends Component<{ children: any }> {
  state = {
    value: 0,
  };

  constructor(props: { children: any }) {
    super(props);
    publish.update = () => {
      let v = this.state.value + 1;
      if (v > 9999) {
        v = 0;
      }
      this.setState(v);
    };
    publish.forceUpdate = () => {
      this.forceUpdate();
    };
  }
  render(): ReactNode {
    return createElement(ObContext.Provider, { children: this.props.children, value: this.state.value });
  }
}
