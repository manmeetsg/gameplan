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
        <div className="group-view">
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div className="group-view">
          <h1>{this.props.group.name}</h1>
        </div>
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
