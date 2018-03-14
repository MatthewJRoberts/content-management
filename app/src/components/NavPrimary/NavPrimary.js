import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavPrimary.css';

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

export default navPrimary;