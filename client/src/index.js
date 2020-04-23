import React from 'react';
import { render } from 'react-dom';
import Cookies from 'js-cookie';
import { AuthContext } from './context/auth';
import Router from './routes';
import * as serviceWorker from './serviceWorker';

const authToken = Cookies.get('token');

const App = () => (
  <AuthContext.Provider value={{ authToken }}>
    <Router />
  </AuthContext.Provider>
);

render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
