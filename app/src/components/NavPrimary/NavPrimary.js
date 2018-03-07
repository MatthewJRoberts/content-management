import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './NavPrimary.css';

import * as actionCreators from './../../store/actions/index';

const navPrimary = props => {
    let links = <p>No Pages Found</p>;
    if(props.pages.length > 0) {
        links = props.pages.map(page => {
            if(page.slug ===  '') {
                return null;
            }
            return (
                <li key={ page._id }>
                    <NavLink to={ `/${ page.slug }` } onClick={ () => props.getPage(page.slug) }>{ page.name }</NavLink>
                </li>
            );
        });
    }

    return (
        <ul className={ [classes.primary, classes.flex].join(' ') }>
            { links }
        </ul>
    );
}

const mapStateToProps = state => {
    return {
        pages: state.sites.pages,
        site: state.sites.site
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPage: (slug) => dispatch(actionCreators.get_page(slug))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(navPrimary);