import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';


class PostShow extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
    };
  }


  render() {
    return (
      <div>
      </div>
    );
  }

}

// connects particular parts of redux state to this components props
const mapStateToProps = (state) => (
  {
    post: state.posts.currentPost,
  }
);


export default connect(mapStateToProps, actions)(PostShow);
