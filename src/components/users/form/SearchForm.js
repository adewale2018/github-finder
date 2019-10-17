import React, { useState, useContext } from "react";
import GithubContext from '../../../contexts/github/githubContext';
import AlertContext from './../../../contexts/alert/alertContext';

const SearchForm = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const { fireAlert } = alertContext;
  const [state, setState] = useState("");

  const handleChange = e => setState(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    if (state === "") {
      fireAlert("Please enter something in the search bar!", "danger");
    } else {
      githubContext.searchUsers(state);
      setState("");
    }
  };

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='user'
          placeholder='Search Users...'
          value={state}
          onChange={handleChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      { githubContext.users.length > 0 && (
        <button
          className='btn btn-block btn-light'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};


export default SearchForm;
