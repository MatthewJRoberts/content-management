import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './AdminPages.css';

import * as actionCreators from './../../store/actions/index';

const adminPages = props => {

    let pages = <p>No Pages Found!</p>;
    if(props.pages) {
        pages = props.pages.map(page => {
            return (
                <div className="item" key={ page._id }>
                    <i className={page.slug === '' ? "large home middle aligned icon" : "large clone middle aligned icon"}></i>
                    <div className="content" style={{width: '100%'}}>
                        <div className={ classes.grid }>
                            <div className={ classes.txt }>
                                <NavLink className="header" to="/" onClick={ () => props.getPage(page.slug) }>{ page.name }</NavLink>
                            </div>
                            <div className={ classes.actions }>
                                <div className="description">
                                    {page.slug !== '' ? 
                                        <button className="ui blue labeled icon button small" onClick={ () => props.toggleModal(page._id) }>
                                            <i className="edit icon"></i>
                                            Edit Page
                                        </button>
                                    : null }   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className="ui relaxed divided list">
            { pages }

            <div className="item">
                <i className="large plus middle aligned icon"></i>
                <div className="content">
                    <a className="header" onClick={ () => props.toggleModal() }>Add Page</a>
                    <div className="description">Create a new page...</div>
                </div>
            </div>

        </div>
    );
}

const mapStateToProps = state => {
    return  {
        pages: state.sites.pages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPage: (slug) => dispatch(actionCreators.get_page(slug)),
        toggleModal: (payload) => dispatch(actionCreators.toggle_modal_page(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(adminPages);