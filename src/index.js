import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PhotoScoring from './PhotoScoring.js';
import { Provider } from 'react-redux';

import store from './Store.js';
let location = window.location;
let ishostname = location.hostname.indexOf('localhost') > -1 || location.hostname.indexOf('192.168') > -1 || location.hostname.indexOf('lovewebgames') > -1
if (!ishostname) {
    location.href = "http://test.lovewebgames.com/";
}

ReactDOM.render(
    <Provider store={store}>
        <PhotoScoring />
    </Provider>,
    document.getElementById('root')
);
