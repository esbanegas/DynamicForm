import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as AlertProvider } from 'react-alert';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { AlertTemplateNotification } from './AlertNotification';
import { alertNotificationOptions } from './AlertNotification/setting';

import './index.css';

const Root = () => (
  <AlertProvider template={AlertTemplateNotification} {...alertNotificationOptions}>
    <App />
  </AlertProvider>
)

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
