import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './styles/Dashboard.css';
import UserSearch from './UserSearch';
import BookmarkedRepos from '../Pages/BookmarkedRepos';
import BookmarkProvider from '../Providers/BookmarkProvider';
import BookMarkChart from '../Pages/BookmarkChart';
import { useAuth } from '../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const Navgivate = useNavigate()
    const [bookmarkedRepos, setBookmarkedRepos] = useState([]);
    const { logout, user } = useAuth()
    const handleBookmark = (repo) => {
        if (!bookmarkedRepos.some((r) => r.id === repo.id)) {
            const updatedRepo = { ...repo, bookmarkedDate: new Date() };
            setBookmarkedRepos([...bookmarkedRepos, updatedRepo]);
            return true;
        }
        return false;
    };
    useEffect(() => {

    }, [user])

    const handleRemoveBookmark = (repo) => {
        setBookmarkedRepos(bookmarkedRepos.filter((r) => r.id !== repo.id));
    };

    const handleLogout = () => {
        try {
            logout()
            Navgivate('/login')
        } catch (error) {
            console.log("Error occured", error)
        }
    }
    return (

        <BookmarkProvider>

            <nav className="navbar is-primary">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src="https://i.ibb.co/P588fdL/github-logo.png" alt="github-logo" border="0" />
                        <h1 className="title">GitHub Serach</h1>
                    </a>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <span className="button is-danger" onClick={handleLogout}>
                            Logout
                        </span>
                    </div>
                </div>
            </nav>
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <div className='box'>
                                <div className="content">
                                    <h2 className="subtitle">BookMark Statistics</h2>
                                    <div >
                                        <BookMarkChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-half">
                            <div className="box" >
                                <div className="content ">
                                    <UserSearch onBookmark={handleBookmark} />
                                </div>
                            </div>
                        </div>
                        <div className="column is-half">
                            <div className="box" style={{ minHeight: "212px" }}>
                                <div className="content">
                                    <BookmarkedRepos
                                        bookmarkedRepos={bookmarkedRepos}
                                        onRemoveBookmark={handleRemoveBookmark}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </BookmarkProvider>


    );
}

export default Dashboard;
