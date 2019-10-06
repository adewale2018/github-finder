import React, { useState } from 'react';

const SearchForm = () => {
  const [state, setState] = useState("");
  const handleChange = e => setState(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    console.log(state);
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
    </div>
  );
}

export default SearchForm;
