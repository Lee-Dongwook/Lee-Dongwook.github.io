import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import GlobalStyle from './styles';
import './i18n';

document.title = import.meta.env.VITE_APP_TITLE;

const rootEl = document.getElementById('root')!;
const root = createRoot(rootEl);

root.render(
  <React.StrictMode>
    <>
      <GlobalStyle />
      <App />
    </>
  </React.StrictMode>,
);
