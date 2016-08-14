import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

import CAS from '../auth/cas';
const cas = new CAS({
  base_url: 'https://login.dartmouth.edu/cas',
  service: 'http://localhost:8080/login',
  version: 2.0,
});

// example class based component (smart component)
class Login extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};

    this.loginRedirect = 'http://localhost:8080/login';
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
        console.log(ticket);

        cas.validate(ticket, (err, status, username, extended) => {
          if (err) console.log(`Validation error: ${err}`);

          console.log('Please');

          console.log(username);
          console.log(extended);
        });
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
