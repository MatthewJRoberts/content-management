import React, { Component } from 'react';
import classes from './Help.css';
import { NavLink } from 'react-router-dom';

class Login extends Component {

    componentDidMount() {
        document.querySelector('li#js').innerHTML = "JavaScript is enabled. No Issues Here.";
    }

    render() {

        return (
            <div className={ classes.Help }>

                <div className="container">
                    <h3 className={ classes.Top }>
                        <i className="info icon"></i>
                    </h3>
                    <NavLink to={ '/' } className={ classes.bread }>
                        <i className="angle double left icon"></i>
                        Back To Site
                    </NavLink>
                    <div className={ classes.card }>
                        <h4 className="ui dividing header">How To...</h4>
                        <div className={ classes.card }>
                            <h4 className={ classes.title }>Add A New Page</h4>
                            <ol>
                                <li><NavLink to={ '/login' }>Login Here</NavLink>, then click the dropdown panel at the top of the page.</li>
                                <li>Click the 'Add Page' button on the left hand side.</li>
                                <li>Type in your page name, then 'Save Page'.</li>
                            </ol>
                        </div>
                        <div className={ classes.card }>
                            <h4 className={ classes.title }>Edit A Page</h4>
                            <ol>
                                <li><NavLink to={ '/login' }>Login Here</NavLink>, then click the dropdown panel at the top of the page.</li>
                                <li>Click the 'Edit Page' button on the page you want to edit.</li>
                                <li>Edit the page name, then 'Save Page'.</li>
                            </ol>
                        </div>
                        <div className={ classes.card }>
                            <h4 className={ classes.title }>Delete A Page</h4>
                            <ol>
                                <li><NavLink to={ '/login' }>Login Here</NavLink>, then click the dropdown panel at the top of the page.</li>
                                <li>Click the 'Edit Page' button on the page you want to delete.</li>
                                <li>Press the 'Delete' button. <b>Warning: this action cannot be recovered.</b></li>
                            </ol>
                        </div>
                        <div className={ classes.card }>
                            <h4 className={ classes.title }>Add, Delete and Edit Posts</h4>
                            <ol>
                                <li><NavLink to={ '/login' }>Login Here</NavLink>.</li>
                                <li>Navigate to the page you want to edit.</li>
                                <li>Click the 'New Post' to add content.</li>
                                <li>Click the 'Edit Post' to edit existing content.</li>
                                <li>Click the 'Edit Post' and then click the 'Delete' button to remove the post.</li>
                            </ol>
                        </div>
                        <div className={ classes.card }>
                            <h4 className={ classes.title }>Edit a site Name or Description</h4>
                            <ol>
                                <li><NavLink to={ '/login' }>Login Here</NavLink>, then click the dropdown panel at the top of the page.</li>
                                <li>Change the name or description on the right hand side.</li>
                                <li>Press the 'Save Changes'.</li>
                            </ol>
                        </div>
                    </div>

                    <div className={ classes.card }>
                        <h4 className="ui dividing header">I Forgot My Password</h4>
                        <div className={ classes.card }>
                            <h4 className={ classes.title }>Password Reset</h4>
                            <ol>
                                <li>Navigate to the, <NavLink to={ '/login' }>Login Page</NavLink></li>
                                <li>Click the 'Forgot Password' button</li>
                                <li>Enter your recovery info and press 'Reset'.</li>
                            </ol>
                        </div>
                    </div>

                    <div className={ classes.card } style={{marginBottom: '5em'}}>
                        <h4 className="ui dividing header">Still Having Issues?</h4>
                        <div className={ classes.card }>
                            <h4 className={ classes.title }>Troubleshoot</h4>
                            <ol>
                                <li>Ensure you are using the <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/chrome/index.html">Google Chrome</a> Browser.</li>
                                <li id="js">JavaScript is disabled. Enable JavaScript in your browser.</li>
                                <li>Press 'Alt + F5' to refresh the webpage.</li>
                            </ol>
                        </div>
                        <div className={ classes.card }>
                            <h4 className={ classes.title }>Get In Touch</h4>
                            <ul>
                                <li>Contact me if none of the above has solved your problem.</li>
                                <li>Email: matthewj.roberts@protonmail.com</li>
                                <li>Alt: matt.roberts4000@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Login;