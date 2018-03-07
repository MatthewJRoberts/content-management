import React, { Component } from 'react';
import classes from './Login.css';
import { connect } from 'react-redux';

import * as actionCreators from './../../store/actions/index';
import ModalPass from './../../components/UI/ModalPass/ModalPass';

class Login extends Component {

    componentDidMount() {
        if(this.props.isAuth) {
            this.props.history.push('/');
        }
    }
    componentDidUpdate() {
        if(this.props.isAuth) {
            this.props.history.push('/');
        }
    }

    render() {

        let error = null;
        if(this.props.error) {
            error = <p 
                className="ui red message" 
                style={{cursor: 'pointer'}} 
                onClick={ this.props.errorRemove }>{ this.props.error }</p>;
        }

        return (
            <div className={ classes.Login }>

                <div className={ classes.mid }>
                    <ModalPass />
                    { error }

                    <h3>Administrator Area</h3>

                    <div className="ui form">
                        <div className="field">
                            <label>Password</label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                value={ this.props.input.password }
                                onChange={ (event) => this.props.inputPassword(event.target.value) } />
                        </div>
                        <div className="field">
                            <a 
                                className="ui button primary"
                                onClick={ () => this.props.userLogin({password: this.props.input.password}) }>Login</a>
                            <a
                                className="ui button mini"
                                onClick={ this.props.toggleModal }
                                style={{marginLeft: '1em'}}>Forgot Password</a>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        input: state.user.input,
        error: state.user.error,
        isAuth: state.user.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        inputPassword: (payload) => dispatch(actionCreators.input_password(payload)),
        userLogin: (payload) => dispatch(actionCreators.user_signin(payload)),
        errorRemove: () => dispatch(actionCreators.user_err_remove()),
        toggleModal: () => dispatch(actionCreators.toggle_modal_pass())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);