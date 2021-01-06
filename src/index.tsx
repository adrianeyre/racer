import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import Racer from './components/racer/racer';

import './index.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <Racer />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
