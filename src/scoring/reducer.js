import { SCREENSHOT } from './actionType.js';

export default (state={score:0,clearShot:false}, action) => {
    switch (action.type) {
        case SCREENSHOT:{
            return {...state,clearShot:action.clearShot};
        }
        default: {
            return state;
        }
    }
}