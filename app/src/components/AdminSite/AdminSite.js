import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from './../../store/actions/index';

const adminSite = props => {
    
    let inputFields = {
        name: '',
        desc: ''
    };
    if(props.siteEdit) {
        inputFields = {
            name: props.siteEdit.name,
            desc: props.siteEdit.desc
        };
    }

    return (
        <div className="ui form" style={{paddingBottom: '4em'}}>
            <div className="field">
                <label>Site Settings</label>
                <div className="two fields">
                    <div className="field">
                        <input 
                            type="text" 
                            placeholder="Site Name"
                            value={ inputFields.name }
                            onChange={ (event) => props.settingChange({type: 'name', value: event.target.value}) } />
                    </div>
                    <div className="field">
                        <input 
                            type="text" 
                            placeholder="Site Description"
                            value={ inputFields.desc } 
                            onChange={ (event) => props.settingChange({type: 'desc', value: event.target.value}) } />
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="ui ok button" onClick={ () => props.settingChange({type: 'reset', value: null}) }>
                    Reset
                </div>
                <div className="ui green ok button" onClick={ () => props.settingSave({siteEdit: props.siteEdit, token: props.token}) }>
                    Save Changes
                    <i className="right checkmark icon"></i>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        site: state.sites.site,
        siteEdit: state.sites.siteEdit,
        token: state.user.auth.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        settingChange: (payload) => dispatch(actionCreators.change_site_settings(payload)),
        settingSave: (payload) => dispatch(actionCreators.save_site_settings(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(adminSite);