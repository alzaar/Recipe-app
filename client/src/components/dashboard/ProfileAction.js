import React from 'react';
import { Link } from 'react-router-dom';
import { deleteProfile } from '../../actions/profileAction';
import { connect } from 'react-redux';

class ProfileAction extends React.Component {
  onClickDelete = () => {
    this.props.deleteProfile(this.props.history);
  }
  render() {
    return(
      <div className="d-flex justify-content-space-between">
        <button onClick={this.onClickDelete} className="btn btn-danger m-1">Delete Account</button>
          <button className="btn btn-dark m-1">
            <Link to="/edit-profile" >Edit Profile <i className="fas fa-user-circle"></i></Link>
          </button>
      </div>
    );
  }
}
export default connect(null, { deleteProfile })(ProfileAction);
