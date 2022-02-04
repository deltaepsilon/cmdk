import { SyntheticEvent } from 'react';

export { default as debounce } from './debounce';
export { default as focusOnActiveButton } from './focus-on-active-button';

export function NOOP(..._: any) {}

export async function wait(millis: number = 0) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

export function stopClick(e?: SyntheticEvent) {
  e?.preventDefault();
  e?.stopPropagation();
}

export function preventDefault(e?: SyntheticEvent) {
  e?.preventDefault();
}

export function stopPropagation(e?: SyntheticEvent) {
  e?.stopPropagation();
}
