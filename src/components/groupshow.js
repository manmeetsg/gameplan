import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { browserHistory, Link } from 'react-router';
import moment from 'moment';
import Select from 'react-select';

// example class based component (smart component)
class GroupShow extends Component {
  constructor(props) {
    super(props);

    // init component state here
    if (this.props.group) {
      this.state = {
        isEditing: false,
        name: this.props.group.name,
        description: this.props.group.description,
        members: this.props.group.members.map(member => {
          return { value: member._id, label: member.name };
        }),
      };
    } else {
      this.state = {
        isEditing: false,
      };
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onGroupDelete = this.onGroupDelete.bind(this);
  }

  componentWillMount() {
    this.props.fetchGroup(this.props.params.id);
    this.props.fetchPostsForGroup(this.props.params.id);
    this.props.getMe();
    this.props.fetchUsers();
  }

  componentDidUpdate(prevProps) {
    // Check name
    if (this.props.group != null) {
      document.title = `GamePlan | ${this.props.group.name}`;
    }
  }

  onSubmit(event) {
    event.preventDefault();

    this.setState({
      isEditing: false,
    });

    this.props.updateGroup(
      this.props.params.id,
      {
        name: this.state.name,
        description: this.state.description,
        members: this.state.members.map(member => { return member.value; }),
      }
    );
  }

  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  onGroupDelete() {
    this.props.deleteGroup(this.props.params.id);
  }

  delete() {
    if (this.props.group.owner === this.props.me._id) {
      return (
        <button type="button" className="cancel" onClick={this.onGroupDelete}> Delete Group</button>
      );
    }
  }

  render() {
    if (!this.props.authenticated) {
      browserHistory.push('/login');
    }

    if (!this.props.group) { // No set group (initially)
      return (
        <div className="viewgroup">
          <h1>Loading...</h1>
        </div>
      );
    } else if (this.state.isEditing) {
      return (
        <div className="newgroup">
          <h1>Editing Group</h1>
          <form onSubmit={this.onSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" onChange={this.onNameChange} name="name" placeholder="Dartmouth '18s, CS Majors, etc." value={this.state.name} />
            <label htmlFor="description">Description</label>
            <textarea type="text" onChange={this.onDescriptionChange} name="description" rows="3" placeholder="A great group of people!" value={this.state.description} />
            <label htmlFor="members">Members</label>
            <Select
              name="members"
              multi
              options={
                this.props.users.map(user => {
                  return { value: user._id, label: user.name };
                })
              }
              onChange={members => this.setState({ members })}
              value={this.state.members}
            />
            <div className="center">
              <button type="submit">Save Group</button>
              <button type="button" className="cancel" onClick={() => {
                this.setState({
                  isEditing: false,
                });
              }}>Cancel</button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="viewgroup">
          <div className="top">
            <div className="titlebar">
              <h1>{this.props.group.name}</h1>
              <div>
                <button onClick={() => {
                  this.setState({
                    isEditing: true,
                    name: this.props.group.name,
                    description: this.props.group.description,
                    members: this.props.group.members.map(member => {
                      return { value: member._id, label: member.name };
                    }),
                  });
                }}>Edit Group</button>
                {this.delete()}
              </div>
            </div>
            <h4>{this.props.group.members.length} member(s)</h4>
            <p>{this.props.group.description}</p>
          </div>
          <ul>
            {this.props.posts.map((post) => {
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
            })}
          </ul>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (state) => (
  {
    group: state.groups.currentGroup,
    authenticated: state.auth.authenticated,
    posts: state.posts.all,
    users: state.users.all,
    me: state.users.me,
  }
);

export default connect(mapDispatchToProps, actions)(GroupShow);
