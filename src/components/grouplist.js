import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { browserHistory, Link } from 'react-router';

// example class based component (smart component)
class GroupList extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};

    this.addGroup = this.addGroup.bind(this);
  }

  componentWillMount() {
    this.props.fetchGroups();
  }

  addGroup() {
    this.props.createGroup({
      name: 'Test',
    });
  }

  render() {
    if (!this.props.authenticated) {
      browserHistory.push('/login');
    }

    if (this.props.groups.length === 0) {
      return (
        <div>
          <h3>Groups</h3>
          No groups.
          <button onClick={this.addGroup}>Add Group</button>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Groups</h3>
          <ul>
            {this.props.groups.map(group => {
              return (
                <li key={group._id}>
                  <Link to={`/groups/${group._id}`}>
                    {group.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button onClick={this.addGroup}>Add Group</button>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (state) => (
  {
    groups: state.groups.all,
    authenticated: state.auth.authenticated,
  }
);

export default connect(mapDispatchToProps, actions)(GroupList);
