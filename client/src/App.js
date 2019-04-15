import React, { Component } from 'react';
import './App.css';
//Auth Header
import setAuthToken from './utils/setAuthToken';
//Decoder
import jwt_decode from 'jwt-decode';
//Comonent Layout
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
//Components Authentications
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
//Search Result components
import Results from './components/searchresults/Results';
//Profile Components
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/createprofile/CreateProfile';
import EditProfile from './components/createprofile/EditProfile';
//COmmon Components
import PrivateRoute from './components/common/PrivateRoute';
//Actions
import { setCurrentUser } from './actions/authAction';
import { logoutUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileAction';
//Get Store
import { store } from './store';
//ROUTER Components
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Recipe Components
import Recipe from './components/recipe/Recipe';

if (localStorage.jwtToken) {
  //Set auth header
  setAuthToken(localStorage.jwtToken)
  //decode token and get info
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticatted
  store.dispatch(setCurrentUser(decoded));
  //Check if time has required for token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //TODO Clear Current User
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="">
          <Navbar/>
          <Route exact path="/" component={Landing}/>
          <div className="container">
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/results" component={Results}/>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/recipe" component={Recipe}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
