import React, { Component } from 'react';
import classes from './Login.css';
import { connect } from 'react-redux';

import * as actionCreators from './../../store/actions/index';
import ModalPass from './../../components/UI/ModalPass/ModalPass';

class Login extends Component {

    componentDidMount() {
        // Redirects logged in users to the front page
        if(this.props.isAuth) {
            this.props.history.push('/');
        }
    }
    componentDidUpdate() {
        // Redirects logged in users to the front page
        if(this.props.isAuth) {
            this.props.history.push('/');
        }
    }

    render() {

        // Error Handling
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
                    <ModalPass
                        active={ this.props.active }
                        passInput={ this.props.passInput }
                        toggleModal={ this.props.toggleModal }
                        changeModal={ this.props.changeModal }
                        resetModal={ this.props.resetModal } />
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
        isAuth: state.user.auth.token !== null,
        active: state.user.showPassModal,
        passInput: state.user.passInput
    }
}

const mapDispatchToProps = dispatch => {
    return {
        inputPassword: payload => dispatch(actionCreators.input_password(payload)),
        userLogin: payload => dispatch(actionCreators.user_signin(payload)),
        errorRemove: () => dispatch(actionCreators.user_err_remove()),
        toggleModal: payload => dispatch(actionCreators.toggle_modal_pass(payload)),
        changeModal: payload => dispatch(actionCreators.change_modal_pass(payload)),
        resetModal: payload => dispatch(actionCreators.reset_modal_pass(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);