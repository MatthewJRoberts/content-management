import * as actionTypes from './actionTypes';
import axios from './../../axios/SiteAxios';

export const get_page = ( slug ) => {
    return dispatch => {
        axios.get(`/pages/p/${ actionTypes.SITE_ID }/${ slug }`).then(response => {
            dispatch(get_page_send(response.data));
        }).catch(e => dispatch(err(`Page not found. (${e.message})`)));
    }
}
export const get_page_send = ( payload ) => {
    return {
        type: actionTypes.GET_PAGE,
        payload: payload
    };
}

export const get_pages = () => {
    return dispatch => {
        axios.get(`/pages/site/${ actionTypes.SITE_ID }`).then(response => {
            dispatch(get_pages_send(response.data));
        }).catch(e => dispatch(err(`Page not found. (${e.message})`)));
    }
}
export const get_pages_send = ( payload ) => {
    return {
        type: actionTypes.GET_PAGES,
        payload: payload
    }
}

export const get_site = () => {
    return dispatch => {
        axios.get(`/users/${ actionTypes.SITE_ID }`).then(response => {
            dispatch(get_site_send(response.data));
        }).catch(e => dispatch(err(`Site not found. (${e.message})`)));
    }
}
export const get_site_send = ( payload ) => {
    return {
        type: actionTypes.GET_SITE,
        payload: payload
    }
}

export const toggle_modal_post = ( postindex ) => {
    return {
        type: actionTypes.TOGGLE_MODAL_POST,
        payload: postindex
    };
}

export const onChangePostHandler_post = ( event, type ) => {
    if(type === 'imgpath') {
        return {
            type: actionTypes.CHANGE_MODAL_POST,
            payload: { type: 'imgpath', value: event.val, name: event.name }
        };
    } else if(type === 'imgpathreset') {
        return {
            type: actionTypes.CHANGE_MODAL_POST,
            payload: { type: 'imgpath', value: null }
        };
    } else {
        return {
            type: actionTypes.CHANGE_MODAL_POST,
            payload: { type, value: event.target.value }
        };
    }
}

export const save_modal_post = ( payload ) => {
    let newPage = { ...payload.page };
    newPage.posts[payload.index] = payload.post;
    return dispatch => {
        axios.put(`/pages/${ payload.page._id }`, { 
            name: newPage.name, 
            posts: newPage.posts,
            slug: newPage.slug,
            isHome: newPage.isHome || false,
            token: payload.token 
        }).then(response => {
            dispatch(save_modal_send_post(response.data));
        }).catch(e => dispatch(err(`Post failed to save. (${e.message})`)));
    };
}
export const save_modal_send_post = ( payload ) => {
    return {
        type: actionTypes.SAVE_MODAL_POST,
        payload: payload
    }
}

export const delete_modal_post = ( payload ) => {
    let newPage = { ...payload.page };
    newPage.posts.splice(payload.index, 1);
    return dispatch => {
        axios.put(`/pages/${ payload.page._id }`, { 
            name: newPage.name, 
            posts: newPage.posts,
            slug: newPage.slug,
            isHome: newPage.isHome,
            token: payload.token
        }).then(response => {
            dispatch(save_modal_send_post(response.data));
        }).catch(e => dispatch(err(`Post failed to delete. (${e.message})`)));
    };
}

export const toggle_modal_page = ( payload ) => {
    return dispatch => {
        if(payload === undefined) {
            return dispatch(toggle_modal_page_send({_id: '', name: '', posts: []}));
        }
        axios.get(`/pages/${ payload }`).then(response => {
            return dispatch(toggle_modal_page_send(response.data));
        }).catch(e => dispatch(err(`Page Modal cannot toggle. (${e.message})`)));
    }
}
export const toggle_modal_page_send = ( payload ) => {
    return {
        type: actionTypes.TOGGLE_MODAL_PAGE,
        payload: payload
    }
}

export const onChangePostHandler_page = ( payload ) => {
    return {
        type: actionTypes.CHANGE_MODAL_PAGE,
        payload: payload
    };
}

export const save_modal_page = ( payload ) => {
    if(payload.page._id === '') {
        let newPage = {
            name: payload.page.name,
            posts: []
        };
        return dispatch => {
            axios.post('/pages', { ...newPage, token: payload.token }).then(response => {
                return dispatch(save_modal_page_send(response.data));
            }).catch(e => dispatch(err(`Page Modal cannot toggle. (${e.message})`)));
        };
    }

    return dispatch => {
        axios.put(`/pages/${ payload.page._id }`, { ...payload.page, token: payload.token }).then(response => {
            return dispatch(save_modal_page_send(response.data));
        }).catch(e => dispatch(err(e.message)));
    };
}
export const save_modal_page_send = ( payload ) => {
    return {
        type: actionTypes.SAVE_MODAL_PAGE,
        payload: payload
    };
}

export const delete_modal_page = ( payload ) => {
    return dispatch => {
        axios.post(`/pages/${ payload.pageid }`, {token: payload.token}).then(repsonse => {
            return dispatch(delete_modal_page_send(repsonse.data));
        }).catch(e => dispatch(err(`Page failed to delete. (${e.message})`)));
    };
}
export const delete_modal_page_send = ( payload ) => {
    return {
        type: actionTypes.DELETE_MODAL_PAGE,
        payload: payload
    };
}

export const change_site_settings = ( payload ) => {
    return {
        type: actionTypes.CHANGE_SITE_SETTINGS,
        payload: payload
    };
}

export const save_site_settings = ( payload ) => {
    return dispatch => {
        axios.put('/users/', { site: payload.siteEdit, token: payload.token }).then(response => {
            dispatch(save_site_settings_send(response.data.site));
        }).catch(e => dispatch(err(`Site Settings unable to save. (${e.message})`)));
    };
}
export const save_site_settings_send = ( payload ) => {
    return {
        type: actionTypes.SAVE_SITE_SETTINGS,
        payload: payload
    };
}

export const toggle_menu = () => {
    return {
        type: actionTypes.TOGGLE_MENU
    };
}

export const err = ( payload ) => {
    return {
        type: actionTypes.ERROR,
        payload: payload
    };
}
export const sites_err_remove = () => {
    return {
        type: actionTypes.ERROR_REMOVE
    };
}
