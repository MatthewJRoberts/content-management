import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './AdminPanel.css';

import * as actionCreators from './../../store/actions/index';
import AdminPages from './../../components/AdminPages/AdminPages';
import AdminSite from './../../components/AdminSite/AdminSite';
import ModalPage from './../../components/UI/ModalPage/ModalPage';

class AdminPanel extends Component {
    state = {
        showPanel: false
    }

    togglePanel = () => {
        this.setState({showPanel: !this.state.showPanel});
    }

    componentDidMount() {
        if(this.props.isAuth) {
            this.props.loadModalPhoto({ token: this.props.token });
        }
    }

    render() {

        // Opens admin panel if showPanel === true
        let panelClasses = [ classes.panel ];
        if(this.state.showPanel) {
            panelClasses.push( classes.panelOpen );
        } else {
            panelClasses.push( classes.panelClose );
        }

        let error = null;
        if(this.props.error) {
            error = (
                <div className="container"> 
                    <div className="ui negative message" onClick={ this.props.errorRemove } style={{margin: '1em 0', cursor: 'pointer'}}>
                        { this.props.error }
                    </div>
                </div>
            );
        }

        let hideShow = (<div><i className="chevron down icon"></i> Show</div>);
        if(this.state.showPanel) {
            hideShow = (<div><i className="chevron up icon"></i> Hide</div>);
        }

        return (
            <div>

                {this.props.isAuth ? <ModalPage 
                    active={ this.props.showModal }
                    token={ this.props.token }
                    pageId={ this.props.pageId }
                    pageEdit={ this.props.pageEdit }
                    modalChange={ this.props.modalChange }
                    modalSave={ this.props.modalSave }
                    modalDelete={ this.props.modalDelete }
                    toggleModal={ this.props.toggleModal } /> : null}

                <div className={ panelClasses.join(' ') }>
                    <div className="container">
                        <div className={ classes.contents }>
                            <header className={ [classes.header, classes.grid].join(' ') }>
                                <div className={ classes.brand }>
                                    <h3>Admin Panel</h3>
                                </div>
                                <div className={ classes.links }>
                                    
                                </div>
                            </header>
                            <main className={ classes.main }>
                                
                                <div className={ classes.grid }>
                                    <div className={ classes.pages }>

                                        <AdminPages
                                            pages={ this.props.pages }
                                            getPage={ this.props.getPage }
                                            toggleModal={ this.props.toggleModal } />

                                    </div>
                                    <div className={ classes.settings }>
                                    
                                        <AdminSite
                                            token={ this.props.token }
                                            site={ this.props.site }
                                            siteEdit={ this.props.siteEdit }
                                            settingChange={ this.props.settingChange }
                                            settingSave={ this.props.settingSave } />
                                    
                                    </div>
                                </div>

                            </main>
                        </div>
                    </div>
                </div>
                { error }
                <div style={{padding: '0.5em 0', cursor: 'pointer', borderTop: 'solid 1px #ccc', background: '#fff'}} onClick={ this.togglePanel }>
                    <div className="container">
                        <div className="ui grid">
                            <div className="four wide column">
                                <h4 style={{padding: '0.5em 0'}}>{ hideShow }</h4>
                            </div>
                            <div className="twelve wide column" style={{textAlign: 'right'}}>
                                <NavLink className="ui green right labeled icon button" to={ '/help' }>
                                    Help
                                    <i className="info out icon"></i>
                                </NavLink>
                                <button className="ui primary right labeled icon button" onClick={ this.props.userSignout }>
                                    Logout
                                    <i className="sign out icon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userSignout: () => dispatch(actionCreators.user_signout()),
        errorRemove: () => dispatch(actionCreators.sites_err_remove()),
        loadModalPhoto: payload => dispatch(actionCreators.load_modal_photo(payload)),
        modalChange: payload => dispatch(actionCreators.onChangePostHandler_page(payload)),
        modalSave: payload => dispatch(actionCreators.save_modal_page(payload)),
        modalDelete: payload => dispatch(actionCreators.delete_modal_page(payload)),
        toggleModal: payload => dispatch(actionCreators.toggle_modal_page(payload)),
        settingChange: payload => dispatch(actionCreators.change_site_settings(payload)),
        settingSave: payload => dispatch(actionCreators.save_site_settings(payload)),
        getPage: slug => dispatch(actionCreators.get_page(slug))
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.user.auth.token !== null,
        token: state.user.auth.token,
        showModal: state.sites.showPageModal,
        error: state.sites.error,
        pageId: state.sites.selectedPageId,
        pageEdit: state.sites.pageEdit,
        site: state.sites.site,
        siteEdit: state.sites.siteEdit,
        pages: state.sites.pages
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);