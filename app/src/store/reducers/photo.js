import * as actionTypes from './../actions/actionTypes';

const initialState = {
    showPhotoBrowser: false,
    photos: [],
    error: null
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.TOGGLE_MODAL_PHOTO:
            return {
                ...state,
                showPhotoBrowser: !state.showPhotoBrowser
            };
        case actionTypes.LOAD_MODAL_PHOTO:
            return {
                ...state,
                photos: action.payload
            };
        case actionTypes.UPLOAD_MODAL_PHOTO:
            let _photos = [...state.photos];
            _photos.push(action.payload);
            return {
                ...state,
                photos: _photos
            };
        case actionTypes.DELETE_MODAL_PHOTO:
            let _photosDel = [...state.photos];
            for(let i = 0; i < _photosDel.length; i++) {
                if(_photosDel[i]._id === action.payload._id) {
                    _photosDel.splice(i, 1);
                }
            }
            return {
                ...state,
                photos: _photosDel
            };
        case actionTypes.ERROR: 
            return {
                ...state, 
                error: action.payload
            };
        default:
            return {
                ...state
            };
    }
}

export default reducer