import * as actionTypes from './actionTypes';
import axios from './../../axios/SiteAxios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const user_signin = ( payload ) => {
    return dispatch => {
        axios.post('/users/profile/login', {password: payload.password, SITE_ID: actionTypes.SITE_ID}).then(response => {
            dispatch(user_signin_send(response.data));
        }).catch(e => dispatch(err(`Failed to login. (${e.message})`)));
    }
}
export const user_signin_send = ( payload ) => {
    cookies.set('token', payload.token, { path: '/' });
    cookies.set('token_expire', new Date(new Date().getTime() + (3600 * 1000)), { path: '/' }); 
    return {
        type: actionTypes.USER_SIGNIN,
        payload: payload
    }
}

export const user_signout = () => {
    let token = cookies.get('token');
    return dispatch => {
        axios.put('/users/profile/token', { token: token }).then(response => {
            dispatch(user_signout_send());
        }).catch(e => dispatch(err(`Failed to sign out. (${e.message})`)));
    }
}
export const user_signout_send = () => {
    cookies.remove('token');
    cookies.remove('token_expire');
    return {
        type: actionTypes.USER_SIGNOUT
    };
}

export const user_authChecker = () => {
    let currentTime = new Date(new Date().getTime());
    let expireTime = new Date(cookies.get('token_expire'));
    let token = cookies.get('token');

    return dispatch => {
        if(!token || token === undefined || expireTime === undefined) {
            return dispatch(user_signout_send());
        }
        if(currentTime >= expireTime) {
            return dispatch(user_signout_send());
        }
        axios.post('/users/profile/me', { token: token }).then(response => {
            return dispatch(user_signin_send({...response.data, token}));
        }).catch(e => {
            return dispatch(user_signout_send());
        });
    }
}

export const input_password = ( payload ) => {
    return {
        type: actionTypes.USER_INPUT_PASSWORD,
        payload: payload
    };
}

export const toggle_modal_pass = ( payload ) => {
    return {
        type: actionTypes.TOGGLE_MODAL_PASS
    };
}

export const change_modal_pass = ( payload ) => {
    if(payload.type === 'recovery') {
        payload.value = payload.value.replace(/[A-Za-z-!$%^&*()_+|~=`{}:";'<>?@,.#£ ]/g, '');
    }
    return {
        type: actionTypes.CHANGE_MODAL_PASS,
        payload: payload
    };
}

export const reset_modal_pass = ( payload ) => {
    return dispatch => {
        axios.get('https://api.ipify.org?format=json').then(ipify => {
            axios.put('/users/profile/reset', {...payload, SITE_ID: actionTypes.SITE_ID, ip: ipify.data.ip}).then(response => {
                dispatch(reset_modal_pass_send(response.data));
            }).catch(e => dispatch(err(`Failed to reset password. (${e.message})`)));
        });
    };
}
export const reset_modal_pass_send = ( payload ) => {
    return {
        type: actionTypes.RESET_MODAL_PASS
    };
}

export const err = ( payload ) => {
    return {
        type: actionTypes.ERROR,
        payload: payload
    };
}
export const user_err_remove = () => {
    return {
        type: actionTypes.ERROR_REMOVE
    }
}