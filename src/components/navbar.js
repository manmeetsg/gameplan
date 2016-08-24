import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

// example class based component (smart component)
class NavBar extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};

    this.onLogOut = this.onLogOut.bind(this);
  }

  onLogOut(event) {
    event.preventDefault();
    this.props.logoutUser();
  }

  auth() {
    if (this.props.authenticated) {
      return (
        <div className="right">
          <div className="item">
            <Link to="/posts/new">
              <i className="fa fa-plus" aria-hidden="true"></i>
              <p className="text">New Post</p>
            </Link>
          </div>
          <div className="item">
            <Link to="/groups/new">
              <i className="fa fa-user-plus" aria-hidden="true"></i>
              <p className="text">New Group</p>
            </Link>
          </div>
          <div className="item">
            <Link to="/profile">
              <i className="fa fa-user" aria-hidden="true"></i>
              <p className="text">Profile</p>
            </Link>
          </div>
          <div className="item">
            <button onClick={this.onLogOut}>
              <i className="fa fa-sign-out" aria-hidden="true"></i>
              <p className="text">Log Out</p>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="right">
          <div className="item">
            <Link to="/login">
              <i className="fa fa-sign-in" aria-hidden="true"></i>
              Log In
            </Link>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="item title">
          <Link to="/"><img src="../../readmepictures/GamePlanLogo.png" alt="Logo" height="40px" /></Link>
        </div>
        {this.auth()}
      </nav>
    );
  }
}

const mapDispatchToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default connect(mapDispatchToProps, actions)(NavBar);
