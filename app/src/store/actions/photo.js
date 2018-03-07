import * as actionTypes from './actionTypes';
import axios from './../../axios/SiteAxios';

export const toggle_modal_photo = ( payload ) => {
    return {
        type: actionTypes.TOGGLE_MODAL_PHOTO
    };
}

export const load_modal_photo = ( payload ) => {
    return dispatch => {
        axios.post('/photos/all', { token: payload.token }).then(response => {
            dispatch(load_modal_photo_send(response.data));
        }).catch(e => dispatch(err(`Failed to load photos. (${e.message})`)))
    };
}
export const load_modal_photo_send = ( payload ) => {
    return {
        type: actionTypes.LOAD_MODAL_PHOTO,
        payload: payload
    };
}

export const upload_modal_photo = ( payload ) => {
    return dispatch => {
        let file = payload.file.files[0];
        if(file === undefined) {
            return dispatch(err('No File, Try pressing Alt + F5'));
        }
        if(file.size >= 16000000) {
            return dispatch(err(`File too large, ${ file.size }...`));
        }
        let reader = new FileReader();
        reader.onloadend = function() {
            axios.post('/photos/', { photo: { name: payload.file.files[0].name, image: reader.result }, token: payload.token }).then(response => {
                dispatch(upload_modal_photo_send(response.data));
            }).catch(e => dispatch(err(`Failed to upload photo. (${e.message})`)));
        }
        reader.readAsDataURL(file);
    };
}
export const upload_modal_photo_send = ( payload ) => {
    return {
        type: actionTypes.UPLOAD_MODAL_PHOTO,
        payload: payload
    };
}

export const delete_modal_photo = ( payload ) => {
    return dispatch => {
        axios.post(`/photos/${ payload.photoid }`, { token: payload.token }).then(response => {
            dispatch(delete_modal_photo_send(response.data));
        }).catch(e => dispatch(err(`Failed to delete photo. (${e.message})`)));
    };
}
export const delete_modal_photo_send = ( payload ) => {
    return {
        type: actionTypes.DELETE_MODAL_PHOTO,
        payload: payload
    };
}

export const err = ( payload ) => {
    return {
        type: actionTypes.ERROR,
        payload: payload
    };
}