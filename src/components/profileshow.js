import React, { Component } from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';

class ProfileShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
    this.props.getMe();
    this.props.fetchPosts();
  }

  render() {
    if (this.props.posts.length === 0 || this.props.me === null) {
      return (
        <div className="posts">
          <h1> Loading... </h1>
        </div>
      );
    } else {
      return (
        <div className="posts">
          <h1>{this.props.me.name}&#39;s Posts</h1>
          <ul>
            {this.props.posts.map((post) => {
              if (post.author._id === this.props.me._id) {
                const groups = post.groups.map(group => {
                  return group.name;
                }).join(', ');

                return (
                  <Link to={`/posts/${post._id}`} key={post._id} className="post">
                    <li key={post._id}>
                      <div className="title">{post.title}</div>
                      <div className="date">{moment(new Date(post.created_at)).format('MMMM Do')}</div>
                      <div className="responders">{post.author.name}</div>
                      <div className="description">{post.description}</div>
                      <span className="groupNames">{groups}</span>
                    </li>
                  </Link>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => (
  {
    me: state.users.me,
    posts: state.posts.all,
  }
);

export default connect(mapStateToProps, actions)(ProfileShow);
