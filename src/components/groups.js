import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

// example class based component (smart component)
class Groups extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchGroups();
  }

  render() {
    if (this.props.groups.length === 0) {
      return (
        <div>
          <h3>Groups</h3>
          No groups.
        </div>
      );
    } else {
      return (
        <div>
          <h3>Groups</h3>
          <ul>
            {this.props.groups.map(group => {
              return (
                <li key={group.id}>
                  <Link to={`/groups/${group.id}`}>
                    {group.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (state) => (
  {
    groups: state.groups.all,
  }
);

export default connect(mapDispatchToProps, actions)(Groups);
