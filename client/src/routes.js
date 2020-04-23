import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { isLoggedIn } from './utils';

import MainLayout from './layouts/MainLayout';

import Main from './pages/Main';
import Game from './pages/Game';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
    {...rest}
  />
);

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    render={props => (
      <Layout>
        {isLoggedIn() ? <Component {...props} /> : <Redirect to="/signin" />}
      </Layout>
    )}
  />
);

const AuthRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    render={props => (
      <Layout>
        {isLoggedIn() ? <Redirect to="/" /> : <Component {...props} />}
      </Layout>
    )}
  />
);

export default () => (
  <Router>
    <Switch>
      <PublicRoute exact path="/" component={Main} layout={MainLayout} />

      <AuthRoute exact path="/signin" component={Signin} layout={MainLayout} />
      <AuthRoute exact path="/signup" component={Signup} layout={MainLayout} />

      <PrivateRoute path="/games/:id" component={Game} layout={MainLayout} />
    </Switch>
  </Router>
);
