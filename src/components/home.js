import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import PostList from './postlist';
import GroupList from './grouplist';

// example class based component (smart component)
class Home extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    if (!this.props.authenticated) {
      return (
        <div>
          Login using your Dartmouth account to get started!
        </div>
      );
    } else {
      return (
        <div className="home">
          <PostList />
          <GroupList />
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

export default connect(mapDispatchToProps, actions)(Home);