import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'typeface-roboto';

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
