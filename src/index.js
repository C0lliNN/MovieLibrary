import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { IntlProvider } from 'react-intl';
import messages_pt from './translations/pt.json';
import messages_en from './translations/en.json';
import LinkProvider from './link-context';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const messages = {
  pt: messages_pt,
  en: messages_en,
};

const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <LinkProvider>
      <App />
    </LinkProvider>
  </IntlProvider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
