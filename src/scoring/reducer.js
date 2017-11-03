import { SHARE_SCORING } from './actionType.js';

export default (state='', action) => {
    switch (action.type) {
        case SHARE_SCORING: {
            return null;
        }
        default: {
            return state;
        }
    }
}