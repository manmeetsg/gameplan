import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

// example class based component (smart component)
class Welcome extends Component {
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
        <div className="item">
          <button onClick={this.onLogOut}>Log Out</button>
        </div>
      );
    } else {
      return (
        <div>
          <div className="item">
            <Link to="/login">Log In</Link>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="nav">
        <div className="item">
          <Link to="/">Alex's Blog</Link>
        </div>
        <div className="item newPost">
          <Link to="/posts/new">New Post</Link>
        </div>

        {this.auth()}
      </div>
    );
  }
}

const mapDispatchToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default connect(mapDispatchToProps, actions)(Welcome);
