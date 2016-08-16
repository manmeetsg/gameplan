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
  }

  render() {
    return (
      <div className="nav">
        <div>
          <Link to="/groups" className="nav-links">View Groups</Link>
        </div>
        <div className="item">
          <Link to="/" id="home"><div id="home-top">what&#39;s your</div><div id="home-bottom">Game Plan?</div></Link>
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

export default connect(mapDispatchToProps, actions)(NavBar);
