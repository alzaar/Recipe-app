import React from 'react';
//Connecting the 2
import { connect } from 'react-redux';
//Actions
import { userLogin } from '../../actions/authAction';
//PropTypes
import PropTypes from 'prop-types';
//smaller components
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.userLogin(user)
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="signup-form">
        <div className="wrapper">
          <h1><center>Login</center></h1>
          <form className="m-3" onSubmit={this.handleOnSubmit}>
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
                  name="password"
                  info="password"
                  error={errors.password}
                  placeholder="Enter Password"
                  value={this.state.password}
                  />
            <div className="mt-3">
              <center><button className="btn btn-outline-dark signup-button  my-2 my-sm-0" type="submit">Sign In</button></center>
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

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { userLogin })(Login);
