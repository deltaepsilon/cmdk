interface Options {
  millis?: number;
  leading?: boolean;
}
export default function debounce(func: Function, { millis = 300, leading = false }: Options = {}) {
  return leading ? leadingDebounce(func, { millis }) : trailingDebounce(func, { millis });
}

function leadingDebounce(func: Function, { millis }: { millis: number }) {
  let blocked = false;

  return (...args: any[]) => {
    if (!blocked) {
      blocked = true;

      func(...args);

      setTimeout(() => {
        blocked = false;
      }, millis);
    }
  };
}

function trailingDebounce(func: Function, { millis }: { millis: number }) {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    timer && clearTimeout(timer);

    timer = setTimeout(() => func(...args), millis);
  };
}
