import { browser, dev } from '$app/environment';
declare const require: any;
declare global {
  interface Window {
    monaco: typeof import('monaco-editor');
  }
}
const version = '0.34.1';

if (browser) {
  if (dev && !/chrome/i.test(navigator.userAgent)) {
    throw new Error(
      'The code editor requires Chrome during development, as it uses module workers'
    );
  }
  await monacoLoaded();
}

async function monacoLoaded() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `https://unpkg.com/monaco-editor@${version}/min/vs/loader.js`;
    document.head.appendChild(script);
    script.onload = () => {
      require.config({
        paths: { vs: `https://unpkg.com/monaco-editor@${version}/min/vs` },
      });
      // Before loading vs/editor/editor.main, define a global MonacoEnvironment that overwrites the default worker url location (used when creating WebWorkers). The problem here is that HTML5 does not allow cross-domain web workers, so we need to proxy the instantiation of a web worker through a same-domain script
      window.MonacoEnvironment = { getWorkerUrl: () => proxy };
      const proxy = URL.createObjectURL(
        new Blob(
          [
            `self.MonacoEnvironment = {
                  baseUrl: 'https://unpkg.com/monaco-editor@${version}/min/'
                };
                importScripts('https://unpkg.com/monaco-editor@${version}/min/vs/base/worker/workerMain.js');`,
          ],
          { type: 'text/javascript' }
        )
      );
      require(['vs/editor/editor.main'], resolve);
    };
  })
}

const monaco = window.monaco;

export { monaco };
