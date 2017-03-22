/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { FocusStyleManager } from '@blueprintjs/core';

import store from './store';
import renderRoutes from './renderRoutes';

// onTouchTap for material-ui
injectTapEventPlugin();

// http://blueprintjs.com/docs/#a11y.focus
FocusStyleManager.onlyShowFocusOnTabs();

render(
  <Provider store={store}>
    {renderRoutes()}
  </Provider>,
  document.getElementById('app'),
);
