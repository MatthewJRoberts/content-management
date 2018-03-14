import React from 'react';
import classes from './PhotoBrowser.css';

const photoBrowser = props => {

    let active = "ui modal";
    if(props.active) {
        active = "ui active modal";
    }

    let photos = null;
    if(props.photos) {
        photos = props.photos.map(p => {
            let buttonClass = "ui button blue";
            if(p._id === "") {
                buttonClass = "ui button blue disabled";
            }
            return (<div className={ classes.photo } key={ p._id }>
                <p>{ p.name }</p>
                <img alt={ p.name } src={ p.image } />
                <button
                    className="ui button negative"
                    style={{marginBottom: '5px', marginLeft: '5px'}}
                    onClick={ () => props.deleteModalPhoto({ photoid: p._id, token: props.token }) } >Delete</button>
                <button
                    className={ buttonClass }
                    style={{marginBottom: '5px', marginLeft: '5px'}}
                    onClick={ () => {
                        props.changeModalPost({val: p.image, name: p.name}, 'imgpath');
                        props.toggleModalPhoto();
                        } } >Use</button>
            </div>);
        });
    }

    return (
        <div className={ active } style={ {top: '20%'} }>
            <div className="header">Photo Browser</div>
            <div className="scrolling content" style={ {maxHeight: '520px'} }>
                <div>
                    <input 
                        type="file" 
                        id="fileup2" 
                        onChange={ () => props.uploadModalPhoto({ file: document.querySelector('input#fileup2'), token: props.token }) } 
                        style={{padding: '0.45em 1em'}}/>
                </div>
                <div className={ classes.photos }>
                    <div className={ classes.photo }>
                        <p>No Image</p>
                        <img alt="Custom" src="https://cdn.shopify.com/s/files/1/1380/9193/t/3/assets/no-image.svg?2375582141201571545" />
                        <button
                            className="ui button blue mini"
                            style={{marginBottom: '5px', marginLeft: '5px'}}
                            onClick={ () => {
                                props.changeModalPost({val: null, name: ''}, 'imgpath');
                                props.toggleModalPhoto();
                                } } >Use</button>
                    </div>
                    { photos }
                </div>
            </div>
            <div className="actions">
                <div className="ui cancel button" onClick={ props.toggleModalPhoto }>Cancel</div>
            </div>
        </div>
    );
}

export default photoBrowser;