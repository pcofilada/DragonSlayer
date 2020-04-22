import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './pages/App';
import Game from './pages/Game';

export default () => (
  <Router>
    <Switch>
      <Route path="/games/:id" component={Game} />
      <Route exact path="/" component={App} />
    </Switch>
  </Router>
);
