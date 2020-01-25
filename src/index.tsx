import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import Racer from './components/racer/racer';

import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Racer />, document.getElementById('root'));
serviceWorker.unregister();
