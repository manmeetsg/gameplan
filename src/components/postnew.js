import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import Select from 'react-select';

class PostNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      groups: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchGroups();
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.createPost({
      title: this.state.title,
      description: this.state.description,
      groups: this.state.groups.map(group => { return group.value; }),
    });
  }

  render() {
    return (
      <div className="newpost">
        <h1>New Post</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Copper Mines" name="title" onChange={(event) => this.setState({ title: event.target.value })} value={this.state.title} />
          <label htmlFor="groups">Groups</label>
          <Select
            name="groups"
            multi
            options={
              this.props.groups.map(group => {
                return { value: group._id, label: group.name };
              })
            }
            onChange={groups => this.setState({ groups })}
            value={this.state.groups}
          />
          <label htmlFor="description">Description</label>
          <textarea name="description" rows="3" placeholder="Have fun with others" onChange={(event) => this.setState({ description: event.target.value })} value={this.state.description} />
          <div className="center">
            <button type="submit">Post</button>
            <Link to="/" className="cancel">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    groups: state.groups.all,
  }
);

export default connect(mapStateToProps, actions)(PostNew);
