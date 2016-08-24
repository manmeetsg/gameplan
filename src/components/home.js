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

    document.title = 'GamePlan | Home';
  }

  render() {
    if (!this.props.authenticated) {
      return (
        <div className="content">
          <img src="../../readmepictures/GamePlanLogo.png" alt="Logo" />
          Log in using your Dartmouth account to get started posting and chatting!
          <iframe src="http://login.dartmouth.edu/cas/logout" height="0" width="0"></iframe>
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
