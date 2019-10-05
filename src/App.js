import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false
    }
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get('https://api.github.com/users');
    this.setState({ users: res.data, loading: false });
  }
  render() {
    const { loading, users } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container">
          <Users loading={loading} users={users}/>
        </div>
      </div>
    );
  }
}

export default App;
