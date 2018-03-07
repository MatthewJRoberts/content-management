import * as actionTypes from './../actions/actionTypes';

const initialState = {
    pages: [],
    page: {},
    site: {},
    siteEdit: {
        name: '',
        desc: ''
    },
    post: {
        title: '',
        text: '',
        imgpath: '',
        template: ''
    },
    selectedImageName: '',
    pageEdit: {
        name: ''
    },
    showPostModal: false,
    selectedPostIndex: null,
    showPageModal: false,
    selectedPageId: null,
    showMenu: false,
    error: null
}

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.GET_SITE:
            return {
                ...state,
                site: action.payload.site,
                siteEdit: action.payload.site
            };
        case actionTypes.GET_PAGES:
            return {
                ...state,
                pages: action.payload
            };
        case actionTypes.GET_PAGE:
            return {
                ...state,
                page: action.payload,
                showMenu: false
            };
        case actionTypes.TOGGLE_MODAL_POST:
            if(Object.keys(state.page).length === 0) {
                return {
                    ...state
                };
            }
            let _post = {title:'',text:'',imgpath:'',template:''};
            if(state.page.posts[action.payload] !== undefined) {
                _post = state.page.posts[action.payload];
            }
            return {
                ...state,
                showPostModal: !state.showPostModal,
                post: _post,
                selectedImageName: '',
                selectedPostIndex: action.payload
            };  
        case actionTypes.CHANGE_MODAL_POST:
            switch( action.payload.type ) {
                case 'title':
                    return {
                        ...state,
                        post: {
                            title: action.payload.value,
                            text: state.post.text,
                            imgpath: state.post.imgpath,
                            template: state.post.template
                        }
                    };
                case 'text':
                    return {
                        ...state,
                        post: {
                            title: state.post.title,
                            text: action.payload.value,
                            imgpath: state.post.imgpath,
                            template: state.post.template
                        }
                    };
                case 'imgpath':
                    return {
                        ...state,
                        post: {
                            title: state.post.title,
                            text: state.post.text,
                            imgpath: action.payload.value,
                            template: state.post.template
                        },
                        selectedImageName: action.payload.name
                    };
                case 'template':
                    return {
                        ...state,
                        post: {
                            title: state.post.title,
                            text: state.post.text,
                            imgpath: state.post.imgpath,
                            template: action.payload.value
                        }
                    };
                default: 
                    return {
                        ...state
                    };
            }
        case actionTypes.SAVE_MODAL_POST:
            return {
                ...state,
                page: action.payload,
                showPostModal: !state.showPostModal,
                post: {
                    title: '',
                    text: '',
                    imgpath: '',
                    template: ''
                },
            };
        case actionTypes.TOGGLE_MODAL_PAGE:
            return {
                ...state,
                showPageModal: !state.showPageModal,
                selectedPageId: action.payload._id,
                pageEdit: action.payload
            };
        case actionTypes.CHANGE_MODAL_PAGE:
            return {
                ...state,
                pageEdit: {
                    ...state.pageEdit,
                    name: action.payload,
                }
            };
        case actionTypes.SAVE_MODAL_PAGE:
            let _page = {...state.page};
            let _pages = [...state.pages];
            if(state.page._id === action.payload._id) {
                _page = {...action.payload};
            }
            for(let i = 0; i < _pages.length; i++) {
                if (_pages[i]._id === action.payload._id) {
                    _pages[i] = {
                        _id: action.payload._id,
                        name: action.payload.name,
                        slug: action.payload.slug
                    };
                    break;
                }
                if(i === _pages.length - 1) {
                    _pages.push({
                        _id: action.payload._id,
                        name: action.payload.name,
                        slug: action.payload.slug
                    });
                    break;
                }
            }
            return {
                ...state,
                showPageModal: !state.showPageModal,
                page: _page,
                pages: _pages
            };
        case actionTypes.DELETE_MODAL_PAGE:
            let _page1 = {...state.page};
            let _pages1 = [...state.pages];
            if(state.page._id === action.payload._id) {
                _page1 = {};
            }
            for(let i = 0; i < _pages1.length; i++) {
                if (_pages1[i]._id === action.payload._id) {
                    _pages1.splice(i, 1);
                }
            }
            return {
                ...state,
                showPageModal: !state.showPageModal,
                pages: _pages1,
                page: _page1
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
        case actionTypes.CHANGE_SITE_SETTINGS:
            switch(action.payload.type) {
                case 'name':
                    return {
                        ...state,
                        siteEdit: {
                            name: action.payload.value,
                            desc: state.siteEdit.desc
                        }
                    };
                case 'desc':
                    return {
                        ...state,
                        siteEdit: {
                            name: state.siteEdit.name,
                            desc: action.payload.value
                        }
                    };
                case 'reset':
                    return {
                        ...state,
                        siteEdit: {
                            name: state.site.name || '',
                            desc: state.site.desc || ''
                        }
                    };
                default: 
                    return {
                        ...state
                    };
            }
        case actionTypes.SAVE_SITE_SETTINGS:
            return {
                ...state,
                site: {
                    name: action.payload.name,
                    desc: action.payload.desc
                }
            };
        case actionTypes.TOGGLE_MENU:
            return {
                ...state,
                showMenu: !state.showMenu
            };
        default: 
            return {
                ...state
            };
    }
}

export default reducer;