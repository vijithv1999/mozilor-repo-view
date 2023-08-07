import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'

const LoginPage = () => {
    const Navigate = useNavigate()
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let authData = await login(formData)
            if (authData.login) Navigate('/dashboard')
            else {
                toast.error(authData.message)
            }
        } catch (error) {
            console.log("Error occured",error)
            toast.error(error.message)
        }


    };

    return (
        <>
            <div className="container">
                <div className="columns is-centered" style={{marginTop:100}}>
                    <div className="column is-one-third">
                        <form className="box" >
                            <h1 className="title has-text-centered">Login</h1>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-primary" onClick={handleSubmit}>Login</button>
                                </div>
                            </div>
                            <div className="has-text-centered">
                                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    );
};

export default LoginPage;
