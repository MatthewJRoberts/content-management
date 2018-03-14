import React from 'react';

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

export default adminSite;