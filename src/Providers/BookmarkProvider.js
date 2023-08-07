import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import axiosInstance from '../configs/axios.interspector';
import toast, { Toaster } from 'react-hot-toast';


const BookmarkContext = createContext();
export const useBookmarkContext = () => {
    return useContext(BookmarkContext);
};





const BookmarkProvider = ({ children }) => {
    const [bookmarkedRepos, setBookmarkedRepos] = useState([]);
    const { user } = useAuth()

    // fethcing the user Repos
    const getUserRepos = async () => {
        try {
            let { userId } = user
            let { data } = await axiosInstance.get(`/list-repos/${userId}`)
            if (data.error) {

            } else {
                let bookmarkedRepos = data.data
                setBookmarkedRepos(bookmarkedRepos)
            }
        } catch (error) {
            console.log("Error occured.", error)
        }
    }

    //functiion to uploadfile
    const handleFileUpload = async (file) => {
        try {
            let formData = new FormData();
            formData.append('file', file);
            formData.append('userId', user.userId);

            await toast.promise(
                axiosInstance.post(`/upload-repo`, formData),
                {
                    loading: 'Saving...',
                    success: (response) => {
                        if (response.data.error) {
                            toast.error(response.data.message);
                        } else {
                            toast.success(response.data.message);
                            getUserRepos();
                        }
                    },
                    error: (error) => {
                        toast.error(error.message)
                    },
                }
            );
        } catch (error) {
            console.log("Error occurred.", error);
            toast.error(error.message);
        }
    }


    useEffect(() => {
        getUserRepos();
    }, []);

    const updateBookmark = async (updatedData) => {
        try {

            let updatedRepos = [...bookmarkedRepos];
            const isExsist = updatedRepos.find(item => item.id === updatedData.id)
            if (!isExsist) {
                updatedRepos = [...updatedRepos, updatedData]
                console.log(updatedRepos)
                setBookmarkedRepos(updatedRepos);
                let payload = updatedData
                payload.userId = user.userId
                console.log(payload)
                // Call API to update bookmarked repository
                await axiosInstance.post(`/bookmark-repo`, payload);
            }
        } catch (error) {
            console.log("Error occurred during update.", error);
        }
    };

    const handleRemoveBookmark = async (repo) => {
        await axiosInstance.delete(`/remove-repo/${repo.id}`);
        setBookmarkedRepos(bookmarkedRepos.filter((r) => r.id !== repo.id));
       
    };



    const contextValue = {
        bookmarkedRepos,
        updateBookmark,
        handleRemoveBookmark,
        handleFileUpload
    };

    return (
        <>
            <BookmarkContext.Provider value={contextValue}>
                {children}
            </BookmarkContext.Provider>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    );
};

export default BookmarkProvider;
