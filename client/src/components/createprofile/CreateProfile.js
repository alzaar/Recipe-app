import React from 'react';
import { connect } from 'react-redux';
//Form Inputs
import TextFieldGroup from '../common/TextFieldGroup';
import BiggerInputField from '../common/BiggerInputField';
//props
import PropTypes from 'prop-types';
import './css/createprofile.css';
//Actions
import { createProfile } from '../../actions/profileAction';
//Router History
import { withRouter } from 'react-router-dom';

class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      bio: '',
      errors: {}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    const details = {
      handle: this.state.handle,
      bio: this.state.bio
    };
    this.props.createProfile(details, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return(
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Profile Details
              </h1>
              <form className="m-3" onSubmit={this.onSubmit}>

                <TextFieldGroup
                  name='handle'
                  placeholder='E.g. Rockstar'
                  value={this.state.handle}
                  error={errors.handle}
                  info="Handle"
                  type="text"
                  onChange={this.onChange}
                  />

                  <BiggerInputField
                    name='bio'
                    placeholder='You can introduce yourself using this'
                    value={this.state.bio}
                    error={errors.bio}
                    info="Bio"
                    type="text"
                    height="800"
                    onChange={this.onChange}
                    />

                  <div className="mt-3">
                    <center><button className="btn btn-outline-dark signup-button  my-2 my-sm-0" type="submit">Create Profile</button></center>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    profile: state.profile
  }
}

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
