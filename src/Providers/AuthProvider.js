import React, { createContext, useContext, useState, useMemo } from 'react';
import axiosInstance from '../configs/axios.interspector';
const AuthContext = createContext();


export const useAuth = () => {
    return useContext(AuthContext);
};


const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState({})



    const isAuthenticated = useMemo(() => {
        let accessToken = localStorage.getItem('token')
        
        let storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
        return !!accessToken;
    }, [accessToken])


    

    const login = async (body) => {
        try {
            let { data } = await axiosInstance.post('/login', body)
            console.log(data)
            if (data.error) {
                return { message: data.message, login: false }
            }
            else {
                let { name, email, userId, token } = data.data
                setUser({ ...user, ...{ email, name, userId } })
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify({ name, email, userId, token }))
                setAccessToken(token)
                return { user, login: true }
            }

        } catch (error) {
            console.log("error occured.", error)
            throw error

        }
    };

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setAccessToken(null)

    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, isAuthenticated, user: user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
