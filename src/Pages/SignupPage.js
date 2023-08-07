import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast"
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (!validatePassword(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters and contain a combination of uppercase, lowercase, and numbers';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      console.log(formData);
      let { data } = await axios.post('http://localhost:3001/user/signup', formData);
      if (data.error) {
        toast.error(data.message);
      } else {
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        })
        toast.success('Successfully Created!');

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  return (
    <>
      <div className="container">
        <div className="columns is-centered" style={{marginTop:100}}>
          <div className="column is-one-third">
            <div className="box">
              <h1 className="title has-text-centered">Sign Up</h1>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <p className="help is-danger">{errors.name}</p>}
              </div>
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
                {errors.email && <p className="help is-danger">{errors.email}</p>}
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
                {errors.password && <p className="help is-danger">{errors.password}</p>}
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="help is-danger">{errors.confirmPassword}</p>
                )}
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-primary" onClick={handleSubmit}>Sign Up</button>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="has-text-centered">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
};

export default SignupPage;
