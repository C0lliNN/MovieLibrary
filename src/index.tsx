import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl-hooks';
import './index.css';
import App from './App';
import messagesPt from './translations/pt.json';
import messagesEn from './translations/en.json';
import GenresProvider from './context/genres';

const messages: Record<string, Record<string, string>> = {
  pt: messagesPt,
  en: messagesEn,
};

const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <GenresProvider>
      <App />
    </GenresProvider>
  </IntlProvider>,
  document.getElementById('root'),
);
