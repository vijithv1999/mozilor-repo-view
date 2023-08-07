import React from 'react';
import GitHubRepoSearch from '../Pages/GitHubRepoSearch';
import './styles/UserSearch.css'

const UserSearch = ({ onBookmark }) => {
    return (
        <div className="user-search-container" style={{padding:10}}>
          
            <GitHubRepoSearch onBookmark={onBookmark} />
        </div>
    );
};

export default UserSearch;
