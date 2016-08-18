import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { browserHistory, Link } from 'react-router';

// example class based component (smart component)
class GroupNew extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      name: '',
      description: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }

  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.createGroup({
      name: this.state.name,
      description: this.state.description,
    });
  }

  render() {
    if (!this.props.authenticated) {
      browserHistory.push('/login');
    }

    return (
      <div className="newgroup">
        <h1>New Group</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" onChange={this.onNameChange} name="name" placeholder="Dartmouth '18s, CS Majors, etc." value={this.state.name} />
          <label htmlFor="description">Description</label>
          <textarea type="text" onChange={this.onDescriptionChange} name="description" rows="3" placeholder="A great group of people!" value={this.state.description} />
          <div className="center">
            <button type="submit">Create Group</button>
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default connect(mapDispatchToProps, actions)(GroupNew);
