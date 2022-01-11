import { SyntheticEvent } from 'react';

export function NOOP(..._: any) {}

export async function wait(millis: number = 0) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

export function stopClick(e?: SyntheticEvent) {
  e?.preventDefault();
  e?.stopPropagation();
}

export function stopPropagation(e?: SyntheticEvent) {
  e?.stopPropagation();
}
