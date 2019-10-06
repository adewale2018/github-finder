import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import SearchForm from './components/users/form/SearchForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false
    }
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
    this.setState({ users: res.data, loading: false });
  }
  searchUsers = async state => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${state}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
    this.setState({ users: res.data.items, loading: false });
  }
  render() {
    const { loading, users } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container">
          <SearchForm searchUsers={this.searchUsers}/>
          <Users loading={loading} users={users}/>
        </div>
      </div>
    );
  }
}

export default App;
