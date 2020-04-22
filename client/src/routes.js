import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import App from './pages/App';
import Game from './pages/Game';
import Signin from './pages/Signin';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
    {...rest}
  />
);

export default () => (
  <Router>
    <Switch>
      <AppRoute path="/games/:id" component={Game} layout={MainLayout} />
      <AppRoute exact path="/signin" component={Signin} layout={MainLayout} />
      <AppRoute exact path="/" component={App} layout={MainLayout} />
    </Switch>
  </Router>
);
