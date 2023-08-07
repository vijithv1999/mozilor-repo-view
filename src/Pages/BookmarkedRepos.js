import React from 'react';
import { BsStarFill } from 'react-icons/bs';
import { useBookmarkContext } from '../Providers/BookmarkProvider';
import UploadFileComponent from './UploadFileComponent';

const BookmarkedRepos = () => {
    const { bookmarkedRepos, handleRemoveBookmark } = useBookmarkContext(); // Use the context hook

    return (
        <div className="container">
            <div className="columns">
                <div className="column">
                    <h2 className="title">Bookmarked Repositories</h2>
                </div>
                <div className="column is-narrow">
                    <UploadFileComponent name={"upload"} />
                </div>
            </div>
            {bookmarkedRepos.length > 0 ? (
                <div className="card-list">
                    {bookmarkedRepos.map((repo) => (
                        <div key={repo.id} className="card repo-card" style={{ marginBottom: '1rem' }}>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <figure className="image is-32x32">
                                            <img
                                                src={repo.avatar_url}
                                                alt={repo.login}
                                            />
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-6">
                                            <a
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {repo.name}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="content">
                                    <p>{repo.description}</p>
                                    <button
                                        className="button is-small is-danger" // Always use 'is-danger' for remove button
                                        onClick={() => handleRemoveBookmark(repo)} // Use handleRemoveBookmark from context
                                    >
                                        <BsStarFill /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="has-text-centered">No bookmarked repositories.</p>
            )}
        </div>
    );
};

export default BookmarkedRepos;
