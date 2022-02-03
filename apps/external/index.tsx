import { CmdkThemeProvider, NOOP, constants } from 'ui';
import { CommandK, ROOT_ID, defaultPlugins } from 'command-k';
import createCache, { EmotionCache } from '@emotion/cache';
import { useCallback, useEffect, useState } from 'react';

import { CacheProvider } from '@emotion/react';
import ReactDOM from 'react-dom';

declare global {
  interface Window {
    __cmdk: { mount: (isActive?: boolean) => () => void; unmount: () => void };
  }
}

const ID = 'cmdk';
const PLUGINS = defaultPlugins;

if (!constants.IS_SERVER) {
  window.__cmdk = {
    mount,
    unmount,
  };
}

export function useScriptCmdk(isActive = !constants.IS_SERVER) {
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
    const container = ref.current.parentElement as HTMLElement;
    const key = 'command-k';

    setCache(
      createCache({
        container,
        prepend: true,
        key,
      }),
    );

    setTimeout(() => {
      const styleTags = container.querySelectorAll(`[data-emotion="${key}-global"]`);

      styleTags.forEach((styleTag) => {
        styleTag.textContent = styleTag.textContent?.replace(/html/g, `#${ROOT_ID}`) || '';
      });
    });

    const oldStyles = document.querySelectorAll('[data-emotion="command-k"]');

    oldStyles.forEach((el) => el.remove());
  }, []);

  return (
    <CacheProvider value={cache}>
      <CmdkThemeProvider>
        <CommandK id="external-build" onRender={onRender} plugins={PLUGINS} />
      </CmdkThemeProvider>
    </CacheProvider>
  );
}

export function mount(isActive = !constants.IS_SERVER) {
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
  el.style.position = 'relative';
  el.style.zIndex = '10000';
  document.body.appendChild(el);
  el.attachShadow({ mode: 'open' });

  return el.shadowRoot;
}
