import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

// example class based component (smart component)
class Login extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};

    this.loginRedirect = 'http://gameplan.surge.sh/login';
    // this.loginRedirect = 'http://localhost:8080/login';
  }

  render() {
    if (this.props.authenticated) {
      return (
        <div>
          You are authenticated!
        </div>
      );
    } else {
      const ticket = this.props.location.query.ticket;
      if (ticket) {
        this.props.loginUser({ ticket });
      } else {
        window.location.replace(`https://login.dartmouth.edu/cas/login?service=${this.loginRedirect}`);
      }

      return (
        <div>
          Not authenticated.
        </div>
      );
    }
  }
}

const mapDispatchToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default connect(mapDispatchToProps, actions)(Login);
