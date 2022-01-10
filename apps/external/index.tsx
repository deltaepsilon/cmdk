import { KittyThemeProvider, NOOP } from 'ui';
import createCache, { EmotionCache } from '@emotion/cache';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CacheProvider } from '@emotion/react';
import { CommandK } from 'command-k';
import ReactDOM from 'react-dom';

declare global {
  interface Window {
    __kitty: { mount: (isActive?: boolean) => () => void; unmount: () => void };
  }
}

const ID = 'script-kitty';
const IS_SERVER = typeof window === 'undefined';

if (!IS_SERVER) {
  window.__kitty = {
    mount,
    unmount,
  };
}

export function useScriptKitty(isActive = !IS_SERVER) {
  useEffect(() => {
    const unmount = mount(isActive);

    return unmount;
  }, []);
}

function ThemedCommandK() {
  const [cache, setCache] = useState<EmotionCache>(
    createCache({ container: document.body, key: 'command-k' }),
  );
  const onRender = useCallback((ref) => {
    const container = ref.current as HTMLElement;

    setCache(
      createCache({
        container,
        prepend: true,
        key: 'command-k',
      }),
    );

    const oldStyles = document.querySelectorAll('[data-emotion="command-k"]');

    oldStyles.forEach((el) => el.remove());
  }, []);

  return (
    <CacheProvider value={cache}>
      <KittyThemeProvider>
        <CommandK onRender={onRender} />
      </KittyThemeProvider>
    </CacheProvider>
  );
}

export function mount(isActive = !IS_SERVER) {
  let unmountReturn = NOOP;

  if (isActive) {
    let shadowRoot = getShadowRoot();

    unmount();

    if (shadowRoot) {
      ReactDOM.render(<ThemedCommandK />, shadowRoot);

      return NOOP;
    } else {
      shadowRoot = createShadowRoot();

      ReactDOM.render(<ThemedCommandK />, shadowRoot);

      unmountReturn = unmount;
    }
  }

  return unmountReturn;
}

function unmount() {
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
  const el = document.createElement('div');

  el.id = ID;
  document.body.appendChild(el);
  el.attachShadow({ mode: 'open' });

  return el.shadowRoot;
}
