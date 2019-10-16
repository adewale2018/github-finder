import React, { useEffect, Fragment } from "react";
import Spinner from "./../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Repo from "./../repos/Repo";

const User = ({ user, getUser, match, getUserRepos, loading, repos }) => {
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);

    //eslint-disable-next-line
  }, []);

  const {
    name,
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
    hireable,
    company
  } = user;

  if (loading) return <Spinner />;
  return (
    <Fragment>
      <h1>User: {login}</h1>
      <Link to='/' className='btn btn-info'>
        Back to Search
      </Link>
      Hireable: {""}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            alt={name}
            className='round-img'
            style={{ width: "150px" }}
          />
          <h1 className='text-success'>{name}</h1>
          {location && (
            <Fragment>
              <h3>Location</h3>
              <p>{location}</p>
            </Fragment>
          )}
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a
            href={html_url}
            className='btn btn-dark my-1'
            target='_blank'
            rel='noopener noreferrer'
          >
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username:</strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company:</strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website:</strong>{" "}
                  <a href={blog} target='_blank' rel='noopener noreferrer'>
                    {blog}
                  </a>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-dark'>Public Repos: {public_repos}</div>
        <div className='badge badge-light'>Public Gists: {public_gists}</div>
      </div>
      <Repo repos={repos} />
    </Fragment>
  );
};
User.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired
};

export default User;
