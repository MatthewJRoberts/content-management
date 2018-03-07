import * as actionTypes from './../actions/actionTypes';

const initialState = {
    input: {
        password: ''
    },
    user: {},
    auth: {
        token: null,
        userid: null
    },
    showPassModal: false,
    passInput: {
        recovery: '',
        pass1: '',
        pass2: ''
    },
    error: null
}

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.USER_SIGNIN:
            return {
                ...state,
                user: action.payload,
                auth: {
                    token: action.payload.token,
                    userid: action.payload._id
                }
            };
        case actionTypes.USER_SIGNOUT:
            return {
                ...state,
                auth: {
                    token: null,
                    userid: null
                },
                user: {}
            };
        case actionTypes.USER_INPUT_PASSWORD:
            return {
                ...state,
                input: {
                    password: action.payload
                }
            };
        case actionTypes.TOGGLE_MODAL_PASS:
            return {
                ...state,
                showPassModal: !state.showPassModal
            };
        case actionTypes.CHANGE_MODAL_PASS:
            switch(action.payload.type) {
                case 'recovery':
                    return {
                        ...state,
                        passInput: {
                            recovery: action.payload.value,
                            pass1: state.passInput.pass1,
                            pass2: state.passInput.pass2
                        }
                    };
                case 'pass1':
                    return {
                        ...state,
                        passInput: {
                            recovery: state.passInput.recovery,
                            pass1: action.payload.value,
                            pass2: state.passInput.pass2
                        }
                    };
                case 'pass2':
                    return {
                        ...state,
                        passInput: {
                            recovery: state.passInput.recovery,
                            pass1: state.passInput.pass1,
                            pass2: action.payload.value
                        }
                    };
                default: 
                    return {
                        ...state
                    };
            }
        case actionTypes.RESET_MODAL_PASS:
            return {
                ...state,
                showPassModal: !state.showPassModal
            };
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload
            };
        case actionTypes.ERROR_REMOVE:
            return {
                ...state,
                error: null
            };
        default: 
            return {
                ...state
            };
    }
}

export default reducer;