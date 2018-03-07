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
        let slug = this.props.match.params.slug || '';
        if(slug !== this.props.page.slug) {
            this.props.getPage(slug);
        }
    }
    
    render() {
        return (
            <Aux>
                {this.props.isAuth ? <ModalPost active={ this.props.show } /> : null}
                <Header />
                <div style={{background: '#fff'}}>
                    <div className={ classes.Page }>
                        <h4 className={ classes.pagetitle }>{ this.props.page.name }</h4> 
                        <Posts posts={ this.props.page.posts } />
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPage: (slug) => dispatch(actionCreators.get_page(slug)),
        toggleModal: () => dispatch(actionCreators.toggle_modal_post()),
        loadModalPhoto: (payload) => dispatch(actionCreators.load_modal_photo(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);