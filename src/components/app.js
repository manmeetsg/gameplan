import React, { Component } from 'react';
import NavBar from './navbar';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
  }

  render() {
    return (
      <div className="all">
        <div id="background"></div>
        <NavBar />
        <div className="filled-content">
          {this.props.children}
        </div>
        <div className="footer">
          Made with <span>❤</span> by Alex Beals, Kyra Maxwell, Manmeet Gujral, Ross Bower, Sydni Topper
        </div>
      </div>
    );
  }
}

export default App;
