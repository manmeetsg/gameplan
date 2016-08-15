import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { browserHistory, Link } from 'react-router';

// example class based component (smart component)
class GroupShow extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchGroup(this.props.params.id);
  }

  render() {
    if (!this.props.authenticated) {
      browserHistory.push('/login');
    }

    if (!this.props.group) { // No set group (initially)
      return (
        <h3>Loading...</h3>
      );
    } else {
      return (
        <h3>{this.props.group.name}</h3>
      );
    }
  }
}

const mapDispatchToProps = (state) => (
  {
    group: state.groups.currentGroup,
    authenticated: state.auth.authenticated,
  }
);

export default connect(mapDispatchToProps, actions)(GroupShow);
