import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { browserHistory, Link } from 'react-router';
import Select from 'react-select';

// example class based component (smart component)
class GroupNew extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      name: '',
      description: '',
      members: [],
      alert: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchUsers();
    this.props.getMe();

    document.title = 'GamePlan | New Group';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.me != null) {
      this.setState({
        members: [{ value: nextProps.me._id, label: nextProps.me.name }],
      });
    }
  }

  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    if (document.getElementsByTagName('form')[0].checkValidity()) {
      this.props.createGroup({
        name: this.state.name,
        description: this.state.description,
        members: this.state.members.map(member => { return member.value; }),
      });
    } else {
      this.setState({
        alert: 'Make sure all fields are filled out.',
      });
    }
  }

  alert() {
    if (this.state.alert) {
      return (
        <div className="alert">
          {this.state.alert}
        </div>
      );
    }
  }

  render() {
    if (!this.props.authenticated) {
      browserHistory.push('/login');
    }

    return (
      <div className="newgroup">
        <h1>New Group</h1>
        {this.alert()}
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" required onChange={this.onNameChange} name="name" placeholder="Dartmouth '18s, CS Majors, etc." value={this.state.name} />
          <label htmlFor="description">Description</label>
          <textarea type="text" required onChange={this.onDescriptionChange} name="description" rows="3" placeholder="A great group of people!" value={this.state.description} />
          <label htmlFor="members">Members</label>
          <Select
            name="members"
            multi
            options={
              this.props.users.map(user => {
                return { value: user._id, label: user.name };
              })
            }
            required
            onChange={members => this.setState({ members })}
            value={this.state.members}
          />
          <div className="center">
            <button type="submit">Create Group</button>
            <Link to="/" className="cancel">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
    users: state.users.all,
    me: state.users.me,
  }
);

export default connect(mapDispatchToProps, actions)(GroupNew);
