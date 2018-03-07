import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import * as actionCreators from './store/actions/index';
import asyncComponent from './hoc/AsyncComponent';

import Layout from './components/Layout/Layout';
import Page from './containers/Page/Page';
const AsyncLogin = asyncComponent(() => import('./containers/Login/Login'));
const AsyncHelp = asyncComponent(() => import('./containers/Help/Help'));

class App extends Component {

  componentDidMount() {
    this.props.autoSignIn();
  }

  render() {
    return (
      <BrowserRouter basename="/">
        <Layout>
          
          <Switch>
            <Route path="/" exact component={ Page } />
            <Route path="/login" component={ AsyncLogin } />
            <Route path="/help" component={ AsyncHelp } />
            <Route path="/:slug" component={ Page } />
            <Redirect to="/" />
          </Switch>
          
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoSignIn: () => dispatch(actionCreators.user_authChecker())
  }
}

export default connect(null, mapDispatchToProps)(App);
