import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PhotoScoring from './PhotoScoring.js';
import { Provider } from 'react-redux';

import store from './Store.js';

ReactDOM.render(
    <Provider store={store}>
        <PhotoScoring />
    </Provider>,
    document.getElementById('root')
);
