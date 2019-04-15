import React from 'react';
import './css/navbar.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';
import { getRecipeByIngredients, addIngredients, clearIngredients } from '../../actions/recipeAction';
import { clearCurrentProfile } from '../../actions/profileAction';
import PropTypes from 'prop-types';
import SearchFormNavbar from '../common/SearchFormNavbar';
import { withRouter } from 'react-router-dom'
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
  }

  handleOnChange = (e) => {
    this.setState({
      searchValue: e.target.value
    });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.clearIngredients();
    this.props.getRecipeByIngredients(this.state.searchValue);
    this.props.addIngredients(this.state.searchValue);
    this.props.history.push('/results');
  }

  onLogout = (e) => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks1 = (
      <li className="nav-item">
        <a onClick={this.onLogout} className="nav-link" href="/">Logout</a>
      </li>
    )

    const authLinks2 = (
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
      </li>
    )

    const guestLinks1 = (
      <li className="nav-item">
        <Link className="nav-link" to="/signup">Signup</Link>
      </li>
    )

    const guestLinks2 = (
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-light mynavbar">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            { isAuthenticated ? authLinks1 : guestLinks1  }
            { isAuthenticated ? authLinks2 : guestLinks2  }
          </ul>
          <SearchFormNavbar
            onChange={this.handleOnChange}
            onSubmit={this.handleOnSubmit}
            value={this.state.value}
            />
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getRecipeByIngredients: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    recipe: state.recipe
  }
}


export default connect(mapStateToProps, { logoutUser, getRecipeByIngredients, clearIngredients, clearCurrentProfile, addIngredients })(withRouter(Navbar));
