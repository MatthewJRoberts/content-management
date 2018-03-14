import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './AdminPages.css';

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

export default adminPages;