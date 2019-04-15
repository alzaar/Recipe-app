import React from 'react';
import './css/form.css';
//PROP_TYPES
import PropTypes from 'prop-types';
//REDUX ACTIONS
import { registerUser } from '../../actions/authAction';
//REACT_REDUX tools
import { connect } from 'react-redux';
//For Redirection
import { withRouter } from 'react-router-dom';
//Smaller Components
import TextFieldGroup from '../common/TextFieldGroup';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleOnSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }
    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="signup-form">
        <div className="wrapper">
          <h1><center>Sign Up</center></h1>
          <form className="m-3" onSubmit={this.handleOnSubmit}>
            <TextFieldGroup
              onChange={this.handleOnChange}
              type="text"
              info="name"
              name="name"
              error={errors.name}
              placeholder="Full Name"
              value={this.state.name}
              />

            <TextFieldGroup
              onChange={this.handleOnChange}
              type="text"
              info="email"
              name="email"
              error={errors.email}
              placeholder="example@email.com"
              value={this.state.email}
              />

              <TextFieldGroup
                onChange={this.handleOnChange}
                type="password"
                info="password"
                name="password"
                error={errors.password}
                placeholder="Create a Password"
                value={this.state.password}
                />

              <TextFieldGroup
                onChange={this.handleOnChange}
                type="password"
                info="Confirm Password"
                name="password2"
                error={errors.password2}
                placeholder="Re-type Password"
                value={this.state.password2}
                />

            <div className="mt-3">
              <center><button className="btn btn-outline-dark signup-button  my-2 my-sm-0" type="submit">Sign Up</button></center>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}


export default connect(mapStateToProps, { registerUser })(withRouter(Signup));
