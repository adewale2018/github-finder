import React, { useState, Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import SearchForm from './components/users/form/SearchForm';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import './App.css';
const App = () => {
  const[users, setUsers] = useState([]);
  const[user, setUser] = useState({});
  const[loading, setLoading] = useState(false);
  const[alert, setAlert] = useState(null);
  const[repos, setRepos] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
      setUsers(res.data);
      setLoading(false);
    }
    fetchData();

  }, []);
  
  const searchUsers = async state => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${state}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
    setUsers(res.data.items);
    setLoading(false);
  }

  // Get a Single Github user
  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
  }  

  // Get users repos
  const getUserRepos = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
    setRepos(res.data);
    setLoading(false);
    
  }  


  // Clear users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  // setAlert
  const fireAlert = (msg, type) => {
    setAlert({msg, type});
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }
    return (
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <Alert alert={alert}/>
            <Switch>
              <Route exact path="/" render={ props => (
                <Fragment>
                  <SearchForm 
                    searchUsers={searchUsers} 
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false }
                    setAlert={fireAlert}
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
                  getUser={getUser} 
                  getUserRepos={getUserRepos} 
                  user={user} 
                  loading={loading}
                  repos={repos} 
                />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  
}

export default App;
