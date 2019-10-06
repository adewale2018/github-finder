import React, { useState } from 'react';
import PropTypes from 'prop-types';


const SearchForm = ({ searchUsers, clearUsers, showClear, setAlert }) => {
  const [state, setState] = useState("");

  const handleChange = e => setState(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    if(state === "") {
      setAlert('Please enter something in the search bar!', 'danger');
    } else {
      searchUsers(state);
      setState("");
    }
  }

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input 
          type="text" 
          name="user" 
          placeholder="Search Users..."
          value={state}
          onChange={handleChange}
        />
        <input 
          type="submit" 
          value="Search" 
          className="btn btn-dark btn-block" 
        />
      </form>
     {showClear &&  <button className="btn btn-block btn-light" onClick={clearUsers}>Clear</button>}
    </div>
  );
}

SearchForm.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default SearchForm;
