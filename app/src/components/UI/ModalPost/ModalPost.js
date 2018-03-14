import React from 'react';

import Aux from './../../../hoc/AuxComponent';
import PhotoBrowser from './../PhotoBrowser/PhotoBrowser';

const modalPost = props => {

    let dimmerClasses = ["ui", "dimmer"];
    if(props.active) {
        dimmerClasses.push("active");
    }

    let photoBrowserActive = props.active && props.showPhoto;

    let inputFields = {
        title: '',
        text: '',
        imgpath: '',
        template: ''
    };

    if(props.post) {
        inputFields.title = props.post.title;
        inputFields.text = props.post.text;
        inputFields.imgpath = props.post.imgpath;
        inputFields.template = props.post.template;
    }

    let deleteButton = (<div className="ui negative right labeled icon button" onClick={ () => props.modalDelete({page: props.page, index: props.postIndex, token: props.token}) }>
                                Delete
                            <i className="right remove icon"></i>
                        </div>);
    if(props.page) {
        if(props.page.posts && !props.page.posts[props.postIndex]) {
            deleteButton = null;
        }
    }

    return (
        <Aux>
            <PhotoBrowser 
                active={ photoBrowserActive }
                token={ props.token }
                isAuth={ props.isAuth }
                photos={ props.photos }
                toggleModalPhoto={ props.toggleModalPhoto }
                uploadModalPhoto={ props.uploadModalPhoto }
                deleteModalPhoto={ props.deleteModalPhoto }
                changeModalPost={ props.changeModalPost } />
                 
            <div className={ dimmerClasses.join(' ') } style={{position: 'fixed'}}>
                <div className="ui active modal" style={ {top: '20%'} }>
                    <div className="header">Edit A Post</div>
                    <div className="content">

                        <div className="ui form">
                            <div className="fields">
                                <div className="field">
                                    <label>Post Title</label>
                                    <input 
                                        type="text" 
                                        placeholder="Enter Post Title" 
                                        value={ inputFields.title }
                                        onChange={ (event, type) => props.modalChange(event, 'title') } />
                                </div>
                                <div className="field">
                                    <label>Post Template</label>
                                    <select 
                                        className="ui search dropdown" 
                                        value={ inputFields.template }
                                        onChange={ (event, type) => props.modalChange(event, 'template') }>
                                        <option value="">Default</option>
                                        <option value="fullTextLeft">Text Left</option>
                                        <option value="fullTextCenter">Text Center</option>
                                        <option value="fullTextRight">Text Right</option>
                                        <option value="halfTextLeft">Image Left</option>
                                        <option value="halfTextRight">Image Right</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <label>Post Photo</label>
                                    <button 
                                        className="ui button blue"
                                        onClick={ props.toggleModalPhoto } >Select Photo</button>
                                </div>
                                <div className="field">
                                    <label>Selected Photo</label>
                                    <p>{ props.imageName  }</p>
                                </div>
                            </div>
                            <div className="field">
                                <label>Post Text</label>
                                <textarea 
                                    placeholder="Enter Post Text" 
                                    value={ inputFields.text }
                                    onChange={ (event, type) => props.modalChange(event, 'text') }></textarea>
                            </div>
                        </div>

                    </div>
                    <div className="actions">
                        <div className="ui cancel button" onClick={ props.toggleModal }>Cancel</div>
                        { deleteButton }
                        <div className="ui positive right labeled icon button" onClick={ () => props.modalSave({page: props.page, post: inputFields, index: props.postIndex, token: props.token}) }>
                            Save Post
                            <i className="right checkmark icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
}

export default modalPost;