import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Login.css';

const Login = () => {
    const [user, setUser] = useState({
        email: '', password: ''
    });

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const loginSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('https://tea-shop-be.onrender.com/user/login', { ...user }, { withCredentials: true, credentials: 'include' });
            window.location.href = "/";
            localStorage.setItem('firstLogin', true);

        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" required
                    placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                    placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
