import React from 'react';
import PropTypes from 'prop-types';


const RepoItem = ({ repo }) => {
  return (
    <div className="card">
      <h3 className="text-success">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" >{repo.name}</a>
      </h3>
    </div>
  );
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
}

export default RepoItem
