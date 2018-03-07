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

    let deleteButton = (<div className="ui red inverted button" onClick={ () => props.modalDelete({pageid: props.pageid, token: props.token}) }>
                            Delete
                            <i className="right remove icon"></i>
                        </div>);
    if(props.pageid === '') {
        deleteButton = null;
    }

    return (
        <div className={ dimmerClasses.join(' ') } style={{position: 'fixed'}}>
            <div className="ui active modal basic" style={ {top: '20%', textAlign: 'center'} }>
                <div className="ui icon header">
                    <i className="file icon"></i>
                </div>
                <div className="content">

                    <div className="ui form" style={{textAlign: 'center'}}>
                        <div className="fields">
                            <div className="field" style={{margin: '0 auto'}}>
                                <label style={{color: '#fff'}}>Page Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter Post Title" 
                                    style={{margin: '0 auto', textAlign: 'center'}}
                                    value={ inputFields.name }
                                    onChange={ (event) => props.modalChange(event.target.value) }/>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="actions">

                    <div className="ui white inverted button" onClick={ props.toggleModal }>Cancel</div>
                    { deleteButton }
                    <div className="ui green ok inverted button" onClick={ () => props.modalSave({page: props.pageEdit, token: props.token}) }>
                        Save Page
                        <i className="right checkmark icon"></i>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.user.auth.token,
        pageid: state.sites.selectedPageId,
        pageEdit: state.sites.pageEdit
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: () => dispatch(actionCreators.toggle_modal_page()),
        modalChange: (payload) => dispatch(actionCreators.onChangePostHandler_page(payload)),
        modalSave: (payload) => dispatch(actionCreators.save_modal_page(payload)),
        modalDelete: (payload) => dispatch(actionCreators.delete_modal_page(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(modalPage);