import {UPLOAD_PHOTO} from './actionType.js';

export const uploadPhoto = img=>({
    type:UPLOAD_PHOTO,
    img
})