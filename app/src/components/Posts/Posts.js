import React from 'react';
import classes from './Posts.css';

import Post from './../Post/Post';

const posts = props => {

    let admin = null;
    if(props.isAuth) {
        let newIndex = 0;
        if(props.posts) {
            newIndex = props.posts.length;
        }
        admin = (
            <div className="container">
                <button 
                    className="ui primary labeled icon button" 
                    style={{margin: '1em 0'}} 
                    onClick={ () => props.toggleModal(newIndex) }>
                    <i className="plus icon"></i>
                    New Post
                </button>
            </div>
        );
    }

    let posts = <p style={ {textAlign: 'center'} }></p>;
    if(props.posts && props.posts.length > 0) {
        posts = props.posts.map((post, index) => {
            return <Post 
                key={ post._id } 
                post={ post } 
                index={ index }
                toggleModal={ props.toggleModal }
                isAuth={ props.isAuth } />;
        });
    }

    return (
        <div className={ classes.Posts }>
            { posts }
            { admin }
        </div>
    );
};

export default posts;