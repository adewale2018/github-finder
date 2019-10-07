import React, { Component } from 'react';

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }
  render() {
    const { 
            name, 
            email,
            avatar_url, 
            location, 
            bio, 
            html_url, 
            blog, 
            login, 
            followers, 
            following, 
            public_repos, 
            public_gists, 
            hireable
          } = this.props.user;
          const { loading } = this.props;
    return (
      <div>
        <h1>User: {name}</h1>
      </div>
    );
  }
}

export default User;
