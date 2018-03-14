import React from 'react';

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

    let deleteButton = (<div className="ui red inverted button" onClick={ () => props.modalDelete({pageid: props.pageId, token: props.token}) }>
                            Delete
                            <i className="right remove icon"></i>
                        </div>);
    if(props.pageId === '') {
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

                    <div className="ui white inverted button" onClick={ () => props.toggleModal() }>Cancel</div>
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


export default modalPage;