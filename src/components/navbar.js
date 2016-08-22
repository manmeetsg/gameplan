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

/*
if (this.props.authenticated) {
  return (
    <div>
      <button onClick={this.onLogOut} className="nav-links">Log Out</button>
    </div>
  );
} else {
  return (
    <div>
      <div>
        <Link to="/login" className="nav-links">Log In</Link>
      </div>
    </div>
  );
}
*/

  render() {
    return (
      <nav>
        <div className="item title">
          <Link to="/"><img src="../../readmepictures/GamePlanLogo.png" alt="Mountain_view" height="40px" /></Link>
        </div>
        {this.auth()}
      </nav>
    );
  }
}

/*
<div className="nav">
  <div>
    <Link to="/groups" className="nav-links">View Groups</Link>
  </div>
  <div className="item">
    <Link to="/" id="home"><div id="home-top">what&#39;s your</div><div id="home-bottom">Game Plan?</div></Link>
  </div>
  <div>
    <Link to="/posts/new" id="newpost">New Post</Link>
  </div>

  {this.auth()}
</div>
*/

const mapDispatchToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default connect(mapDispatchToProps, actions)(NavBar);
