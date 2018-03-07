import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './../../../store/actions/index';

const modalPage = props => {

    let dimmerClasses = ["ui", "dimmer"];
    if(props.active) {
        dimmerClasses.push("active");
    }

    let inputFields = {
        name: ''
    };

    if(props.pageEdit !== undefined) {
        inputFields.name = props.pageEdit.name;
    }

    return (
        <div className={ dimmerClasses.join(' ') } style={{position: 'fixed'}}>
            <div className="ui active modal basic" style={ {top: '20%', textAlign: 'center'} }>
                <div className="ui icon header">
                    <i className="refresh icon"></i>
                </div>
                <div className="content">

                    <div className="ui form" style={{textAlign: 'center', width: '60%', margin: '0 auto'}}>
                        <div className="field" style={{margin: '0 auto'}}>
                            <label style={{color: '#fff'}}>Recovery Code</label>
                            <input 
                                type="text" 
                                placeholder="Enter Recovery Code" 
                                style={{margin: '0 auto', textAlign: 'center'}}
                                value={ props.passInput.recovery }
                                onChange={ (event) => props.changeModal({type: 'recovery', value: event.target.value}) } />
                        </div>
                        <div className="two fields" style={{marginTop: '1em'}}>
                            <div className="field" style={{margin: '0 auto'}}>
                                <label style={{color: '#fff'}}>New Password</label>
                                <input 
                                    type="password" 
                                    placeholder="New Password" 
                                    style={{margin: '0 auto', textAlign: 'center'}}
                                    value={ props.passInput.pass1 }
                                    onChange={ (event) => props.changeModal({type: 'pass1', value: event.target.value}) } />
                            </div>
                            <div className="field" style={{margin: '0 auto'}}>
                                <label style={{color: '#fff'}}>Confirm Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    style={{margin: '0 auto', textAlign: 'center'}}
                                    value={ props.passInput.pass2 }
                                    onChange={ (event) => props.changeModal({type: 'pass2', value: event.target.value}) } />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="actions">

                    <div className="ui white inverted button" onClick={ props.toggleModal }>Cancel</div>
                    <div className="ui green ok inverted button" onClick={ () => props.resetModal({...props.passInput}) }>
                        Reset Password
                        <i className="right checkmark icon"></i>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        active: state.user.showPassModal,
        passInput: state.user.passInput
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: () => dispatch(actionCreators.toggle_modal_pass()),
        changeModal: (payload) => dispatch(actionCreators.change_modal_pass(payload)),
        resetModal: (payload) => dispatch(actionCreators.reset_modal_pass(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(modalPage);