import { useEffect } from 'react';

import ReactDOM from 'react-dom';
import { CommandK } from 'command-k';
import { KittyThemeProvider } from 'ui';



function NOOP () {}

// function CommandK() {
//   return <div>Command K</div>;
// }

const ID = 'script-kitty';
const IS_SERVER = typeof window === 'undefined';

export function useScriptKitty(isActive = !IS_SERVER) {
  useEffect(() => {
    const unmount = mount(isActive);

    return unmount;
  }, []);
}

export function mount(isActive = !IS_SERVER) {
  let unmount = NOOP;

  if (isActive) {
    let shadowRoot = getShadowRoot();

    if (shadowRoot) {
      console.log({ shadowRoot });
      ReactDOM.render(<CommandK />, shadowRoot);

      return NOOP;
    } else {
      shadowRoot = createShadowRoot();

      ReactDOM.render(<CommandK />, shadowRoot);

      unmount = unmountEl;
    }
  }

  return unmount;
}

function unmountEl() {
  const el = document.getElementById(ID);

  if (el) {
    ReactDOM.unmountComponentAtNode(el);
    document.body.removeChild(el);
  }
}

function getShadowRoot() {
  const existingEl = document.getElementById(ID);

  existingEl && !existingEl.shadowRoot && existingEl.attachShadow({ mode: 'open' });

  return existingEl?.shadowRoot;
}

function createShadowRoot() {
  console.log({ document });
  const el = document.createElement('div');

  el.id = ID;
  document.body.appendChild(el);
  el.attachShadow({ mode: 'open' });

  return el.shadowRoot;
}
