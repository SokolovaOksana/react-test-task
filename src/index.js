import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './Store.js';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App store={store} />, document.getElementById('root'));

serviceWorker.unregister();