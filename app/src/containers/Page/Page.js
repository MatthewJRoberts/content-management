import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Page.css';
import Posts from './../../components/Posts/Posts';
import * as actionCreators from './../../store/actions/index';
import Aux from './../../hoc/AuxComponent';
import ModalPost from './../../components/UI/ModalPost/ModalPost';
import Header from './../Header/Header';
import Footer from './../Footer/Footer';

class Page extends Component {

    componentDidMount() {
        // Loads page based on slug in url
        let slug = this.props.match.params.slug || '';
        if(slug !== this.props.page.slug) {
            this.props.getPage(slug);
        }
    }
    
    render() {
        return (
            <Aux>

                {this.props.isAuth ? <ModalPost 
                    active={ this.props.show }
                    token={ this.props.token }
                    page={ this.props.page }
                    showPhoto={ this.props.showPhoto }
                    post={ this.props.post }
                    postIndex={ this.props.postIndex }
                    imageName={ this.props.imageName }
                    toggleModal={ this.props.toggleModal }
                    toggleModalPhoto={ this.props.toggleModalPhoto }
                    modalChange={ this.props.modalChange }
                    modalSave={ this.props.modalSave }
                    modalDelete={ this.props.modalDelete }
                    isAuth={ this.props.isAuth }
                    photos={ this.props.photos }
                    loadModalPhoto={ this.props.loadModalPhoto }
                    uploadModalPhoto={ this.props.uploadModalPhoto }
                    deleteModalPhoto={ this.props.deleteModalPhoto }
                    changeModalPost={ this.props.changeModalPost } /> : null}

                <Header />
                <div style={{background: '#fff'}}>
                    <div className={ classes.Page }>
                        <h4 className={ classes.pagetitle }>{ this.props.page.name }</h4> 
                        <Posts 
                            posts={ this.props.page.posts }
                            isAuth={ this.props.isAuth }
                            toggleModal={ this.props.toggleModal } />
                    </div>
                </div>
                <Footer />
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        page: state.sites.page,
        isAuth: state.user.auth.token !== null,
        show: state.sites.showPostModal,
        token: state.user.auth.token,
        showPhoto: state.photo.showPhotoBrowser,
        post: state.sites.post,
        postIndex: state.sites.selectedPostIndex,
        imageName: state.sites.selectedImageName,
        photos: state.photo.photos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPage: slug => dispatch(actionCreators.get_page(slug)),
        toggleModal: payload => dispatch(actionCreators.toggle_modal_post(payload)),
        loadModalPhoto: payload => dispatch(actionCreators.load_modal_photo(payload)),
        toggleModalPhoto: () => dispatch(actionCreators.toggle_modal_photo()),
        modalChange: (event, type) => dispatch(actionCreators.onChangePostHandler_post(event, type)),
        modalSave: payload => dispatch(actionCreators.save_modal_post(payload)),
        modalDelete: (payload) => dispatch(actionCreators.delete_modal_post(payload)),
        changeModalPost: (event, type) => dispatch(actionCreators.onChangePostHandler_post(event, type))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);