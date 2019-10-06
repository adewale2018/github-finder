import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import SearchForm from './components/users/form/SearchForm';
import Alert from './components/layout/Alert';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
      alert: null
    }
  }

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
  // Clear users
  clearUsers = () => this.setState({ users: [], loading: false });

  // setAlert
  setAlert = (msg, type) => {
    this.setState({ alert : {msg, type} });
    setTimeout(() => {
      this.setState({ alert: null})
    }, 5000);
  }

  render() {
    const { loading, users } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert}/>
          <SearchForm 
            searchUsers={this.searchUsers} 
            clearUsers={this.clearUsers}
            showClear={this.state.users.length > 0 ? true : false }
            setAlert={this.setAlert}
          />
          <Users 
            loading={loading} 
            users={users}
          />
        </div>
      </div>
    );
  }
}

export default App;
