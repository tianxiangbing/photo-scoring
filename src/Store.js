import {createStore,combineReducers} from 'redux';

import {reducer as photoReducer} from './photo';
import {reducer as ScoringReducer} from './scoring/index.js';
import Perf from 'react-addons-perf';

const win = window;
win.Perf = Perf
const reducer = combineReducers({
    img:photoReducer,
    scoreborad:ScoringReducer
});


export default createStore(reducer,{})