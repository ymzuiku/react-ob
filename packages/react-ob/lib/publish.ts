let timer: NodeJS.Timeout | null = null;
export function publish() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  timer = setTimeout(() => {
    publish.fn();
  }, 16);
}

publish.fn = () => {};
