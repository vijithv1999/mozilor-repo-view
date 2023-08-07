import React, { useState } from 'react';
import axios from 'axios';
import { BsStarFill } from 'react-icons/bs';
import { useBookmarkContext } from '../Providers/BookmarkProvider';

const GitHubRepoSearch = () => {
    const [username, setUsername] = useState('');
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const { updateBookmark } = useBookmarkContext()
    const handleChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        try {
            let url;
    
            if (username.includes("/")) {
                // If the value contains "/", assume it's a repository
                let repoName = username.replace(/^\//, '');
                url = `https://api.github.com/search/repositories?q=${repoName}`;
            } else {
                // Otherwise, assume it's a username
                url = `https://api.github.com/users/${username}/repos`;
            }
    
            const response = await axios.get(url);
    
            let reposArray = [];
    
            if (Array.isArray(response.data.items)) {
                // If the response is an array, it's repositories for a search query
                reposArray = response.data.items.map(repo => ({
                    avatar_url: repo.owner.avatar_url,
                    name: repo.name,
                    id: repo.id.toString(),
                    description: repo.description,
                    html_url: repo.html_url,
                    login: repo.owner.login
                }));
            } else if (Array.isArray(response.data)) {
                // If the response is an array, it's repositories for a username
                reposArray = response.data.map(repo => ({
                    avatar_url: repo.owner.avatar_url,
                    name: repo.name,
                    id: repo.id.toString(),
                    description: repo.description,
                    html_url: repo.html_url,
                    login: repo.owner.login
                }));
            } else {
                // If the response is an object, it's a single repository
                const repo = response.data;
                reposArray = [{
                    avatar_url: repo.owner.avatar_url,
                    name: repo.name,
                    id: repo.id.toString(),
                    description: repo.description,
                    html_url: repo.html_url,
                    login: repo.owner.login
                }];
            }
    console.log(reposArray)
            setRepos(reposArray);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching repositories:', error);
            setLoading(false);
        }
    };
    

    const onBookmark = async (repo) => {
        try {
            let newRepo = {
                avatar_url: repo.avatar_url,
                name: repo.name,
                id: repo.id.toString(),
                description: repo.description,
                html_url: repo.html_url,
                login: repo.login
            }
            await updateBookmark(newRepo)
        } catch (error) {
            console.error('Error adding to BookMark:', error);

        }
    }

    return (
        <div className="container">
            <h1 className="title">GitHub Repo Search</h1>
            <form onSubmit={handleSubmit}>
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter GitHub Username or /Repo"
                            value={username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="control">
                        <button className="button is-primary" type="submit">
                            Search
                        </button>
                    </div>
                </div>
            </form>
            {loading && (
                <div className="has-text-centered" style={{ marginTop: '1rem' }}>
                    <span className="icon">
                        <i className="fas fa-circle-notch fa-spin"></i>
                    </span>
                </div>
            )}
            {repos.length > 0 ? (
                <div className="repo-list">
                    <h2 className="subtitle">Repositories for {username}:</h2>
                    <div className="repo-cards">
                        {repos.map((repo) => (
                            <div key={repo.id} className="repo-card card" style={{ marginBottom: '1rem' }}>
                                <div className="card-content">
                                    <div className="media" style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="media-left">
                                            <figure className="image is-32x32">
                                                <img
                                                    src={repo.avatar_url}
                                                    alt={repo.login}
                                                />
                                            </figure>
                                        </div>
                                        <div className="media-content">
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <p className="title is-6">
                                                    <a
                                                        href={repo.html_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {repo.name}
                                                    </a>
                                                </p>
                                                <p className="subtitle is-7" style={{ paddingTop: '0.4rem' }}>
                                                    {repo.login}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content">
                                        {repo.description}
                                        <br />
                                        <button
                                            className={`button is-small is-warning`}
                                            onClick={() => onBookmark(repo)}
                                        >
                                            <BsStarFill />  Bookmark
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            ) : (
                <p className="has-text-centered" style={{ marginTop: '1rem' }}>
                    {loading ? 'Loading...' : 'No repositories found.'}
                </p>
            )}
        </div>
    );


};

export default GitHubRepoSearch;
