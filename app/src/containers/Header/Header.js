import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './Header.css';

import * as actionCreators from './../../store/actions/index';
import Aux from './../../hoc/AuxComponent';
import NavPrimary from './../../components/NavPrimary/NavPrimary';
import AdminPanel from './../AdminPanel/AdminPanel';

class Header extends Component {

    componentDidMount() {
        this.props.getSite();
        this.props.getPages();
    }

    render() {
        let menuClasses = [classes.links];
        if(this.props.showMenu) {
            menuClasses.push(classes.open);
        }

        let bannerClasses = [classes.banner];
        if(this.props.page.slug !== '') {
            bannerClasses.push(classes.mini);
        }

        return (
            <Aux>
                { this.props.isAuth ? <AdminPanel /> : null }
                <header className={ bannerClasses.join(' ') }>
                    <div className={ classes.Header }>
                        <div className="container">
                            <div className={ classes.grid }>
                                <div className={ [classes.brand, classes.flex].join(' ') }>
                                    <NavLink to={ '/' } className={ classes.link } onClick={ () => this.props.getPage('') }>{ this.props.site.name }</NavLink>
                                </div>
                                <div className={ classes.drop }>
                                    <div className={ classes.dropdown } onClick={ this.props.toggleMenu }>
                                        <i className="sidebar icon"></i>
                                    </div>
                                </div>
                                <div className={ menuClasses.join(' ') }>
                                    <NavPrimary />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={ classes.mid }>
                        <div style={{margin: '0 auto', textAlign: 'center'}}>
                            <h1>WELCOME TO</h1>
                            <div className={ classes.line }></div>
                            <h2>{ this.props.site.name }</h2>
                            <h3>Shrewsbury, Shropshire</h3>
                        </div>
                    </div>
                </header>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        pages: state.sites.pages,
        page: state.sites.page,
        site: state.sites.site,
        isAuth: state.user.auth.token !== null,
        showMenu: state.sites.showMenu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPage: (slug) => dispatch(actionCreators.get_page(slug)),
        getSite: () => dispatch(actionCreators.get_site()),
        getPages: () => dispatch(actionCreators.get_pages()),
        toggleMenu: () => dispatch(actionCreators.toggle_menu())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);