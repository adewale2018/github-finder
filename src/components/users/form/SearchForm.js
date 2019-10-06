import React, { useState } from 'react';

const SearchForm = ({ searchUsers }) => {
  const [state, setState] = useState("");

  const handleChange = e => setState(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    searchUsers(state);
    setState("");
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
          required="require"
        />
        <input 
          type="submit" 
          value="Search" 
          className="btn btn-dark btn-block" 
        />
      </form>
    </div>
  );
}

export default SearchForm;
