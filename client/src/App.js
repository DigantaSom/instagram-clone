import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// css
import './css/App.css';
import './css/Media-Queries.css';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import setAuthToken from './components/utils/setAuthToken';
import { loadUser } from './redux/actions/auth';
// components
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import Landing from './components/layout/Landing';
import CreatePost from './components/post-forms/CreatePost';
import Profile from './components/profile/Profile';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        <section className='container'>
          <Alert />
          <PrivateRoute exact path='/' component={Landing} />
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <PrivateRoute path='/create-post' component={CreatePost} />
            <PrivateRoute path='/:user_id' component={Profile} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
