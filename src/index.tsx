import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import './index.css';
import App from './App';

const configureAmplify = async () => {
  try {
    const response = await fetch('/amplify_outputs.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load amplify outputs: ${response.status}`);
    }

    const outputs = await response.json();
    Amplify.configure(outputs);
  } catch (error) {
    // Keep local dev/build usable before sandbox outputs are generated.
    if (import.meta.env.DEV) {
      console.warn('Amplify is not configured yet. Run `npm run ampx:sandbox:outputs`.', error);
    }
  }
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

configureAmplify().finally(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
