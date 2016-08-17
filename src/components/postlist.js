import React, { Component } from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import '../style.scss';


class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div id="content">
        <h2>Posts</h2>
        <ul>
        {this.props.posts.map((post) => {
          return <Link id="homelink" to={`/posts/${post.id}`} key={post.id}><li> <i id="posttitle">{post.title}</i></li></ Link>;
        })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
  }
);

export default connect(mapStateToProps, actions)(PostList);
