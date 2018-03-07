import React from 'react';
import { connect } from 'react-redux';
import classes from './Post.css';

import * as actionCreators from './../../store/actions/index';
import Aux from './../../hoc/AuxComponent';

const post = props => {

    let admin = null;
    if(props.isAuth) {
        admin = <button className="ui button mini" onClick={ () => props.toggleModal(props.index) }>Edit Post</button>;
    }

    let postClass = [ classes.Post ];
        
    switch(props.post.template) {
        case 'fullTextLeft':
            postClass.push( classes.fullTextLeft );
            break;
        case 'fullTextRight':
            postClass.push( classes.fullTextRight );        
            break;
        case 'fullTextCenter':
            postClass.push( classes.fullTextCenter );        
            break;
        case 'halfTextLeft':
            postClass.push( classes.halfTextLeft );        
            break;
        case 'halfTextRight':
            postClass.push( classes.halfTextRight );        
            break;
        default:
            break;
    }

    let newText = null;
    if(props.post.text) {
        newText = props.post.text.split(/\n/g);
        newText = newText.map((txt, index) => {
            return <p className={ classes.paragraph } key={ `${txt}-${index}` }>{ txt }</p>;
        });
    }

    let displayPost = (
        <div className={ classes.grid }>
            <div className={ classes.boxImg }>
                { props.post.imgpath ? <img className={ classes.image } src={ props.post.imgpath } alt={ props.post.title } /> : null }
            </div>
            <div className={ classes.boxTitle }>
                { props.post.title ? 
                    <Aux>
                        <h3 className={ classes.title }>{ props.post.title }</h3>
                        <div className={ classes.line }></div>
                    </Aux>
                : null }
            </div>
            <div className={ classes.boxText }>
                { newText }
                {/* { props.post.text ? <p className={ classes.paragraph }>{ props.post.text }</p> : null } */}
            </div>
        </div>
    );
    return (
        <div className={ postClass.join(' ') }>
            <div className="container">
                { displayPost }
                { admin }
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.user.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: (postindex) => dispatch(actionCreators.toggle_modal_post(postindex))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(post);