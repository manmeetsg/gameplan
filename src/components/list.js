import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

// example class based component (smart component)
class List extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    if (this.props.posts.length === 0) {
      return (
        <div className="posts">
          <h3>Posts</h3>
          No posts.
        </div>
      );
    } else {
      return (
        <div className="posts">
          <h3>Posts</h3>
          <ul>
            {this.props.posts.map(post => {
              return (
                <li key={post.id}>
                  <Link to={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                  {post.tags.join(', ')}
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
    posts: state.posts.all,
  }
);

export default connect(mapDispatchToProps, actions)(List);
