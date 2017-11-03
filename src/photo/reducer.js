import { UPLOAD_PHOTO } from './actionType.js';

export default (state = '', action) => {
    switch (action.type) {
        case UPLOAD_PHOTO: {
            return action.img;
        }
        default:
            return state;
    }
}