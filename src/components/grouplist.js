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
  }

  componentWillMount() {
    this.props.fetchGroups();
  }

  render() {
    if (!this.props.authenticated) {
      browserHistory.push('/login');
    }

    if (this.props.groups.length === 0) {
      return (
        <div className="groups">
          <Link to="/groups"><h1>Groups</h1></Link>
          Loading...
        </div>
      );
    } else {
      return (
        <div className="groups">
          <div className="titlebar">
            <Link to="/groups"><h1>Groups</h1></Link>
            <div className="item">
              <Link to="/groups/new" id="groupplus">
                <i className="fa fa-user-plus" aria-hidden="true"></i>
                <p className="text">New</p>
              </Link>
            </div>
          </div>
          <ul>
            {this.props.groups.map(group => {
              return (
                <li key={group._id}>
                  <Link to={`/groups/${group._id}`}>
                    <div className="name">
                      {group.name}
                    </div>
                    <div className="members">
                      {group.members.length} member(s)
                    </div>
                    <div className="description">
                      {group.description}
                    </div>
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
    authenticated: state.auth.authenticated,
  }
);

export default connect(mapDispatchToProps, actions)(GroupList);
