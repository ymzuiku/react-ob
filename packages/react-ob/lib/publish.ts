/* eslint-disable @typescript-eslint/no-explicit-any */

let timer: any | null = null;
export function publish() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  timer = setTimeout(() => {
    publish.update();
  }, 16);
}

publish.update = () => {};
publish.forceUpdate = () => {};
