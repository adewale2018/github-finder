import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import SearchForm from './components/users/form/SearchForm';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {},
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

  // Get a Single Github user
  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
    this.setState({ user: res.data, loading: false });
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
    const { loading, users, user } = this.state;
    return (
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert}/>
            <Switch>
              <Route exact path="/" render={ props => (
                <Fragment>
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
                </Fragment>
              )} 
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={props => (
                <User {...props} 
                  getUser={this.getUser} 
                  user={user} 
                  loading={loading} 
                />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
