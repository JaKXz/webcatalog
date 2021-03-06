/* global window document */

const { remote } = require('electron');
const settings = require('electron-settings');
const camelCase = require('lodash.camelcase');

const argv = remote.getCurrentWindow().appInfo;

window.onload = () => {
  // inject JS
  settings.get(`behaviors.${camelCase(argv.id)}.injectedJS`)
    .then((injectedJS) => {
      if (!injectedJS || injectedJS.trim().length < 1) return;

      try {
        const node = document.createElement('script');
        node.innerHTML = injectedJS;
        document.body.appendChild(node);
      } catch (err) {
        /* eslint-disable no-console */
        console.log(err);
        /* eslint-enable no-console */
      }
    });

  // inject CSS
  settings.get(`behaviors.${camelCase(argv.id)}.injectedCSS`)
    .then((injectedCSS) => {
      if (!injectedCSS || injectedCSS.trim().length < 1) return;

      try {
        const node = document.createElement('style');
        node.innerHTML = injectedCSS;
        document.body.appendChild(node);
      } catch (err) {
        /* eslint-disable no-console */
        console.log(err);
        /* eslint-enable no-console */
      }
    });
};
