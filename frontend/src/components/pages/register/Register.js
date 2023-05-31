import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Register.css';

const Register = () => {
    const [user, setUser] = useState({
        name: '', surname: '', email: '', password: ''
    });

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const registerSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('https://tea-shop-be.onrender.com/user/register', { ...user });
            window.location.href = "/";
            localStorage.setItem('firstLogin', true);

        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="register-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input type="text" name="name" required
                    placeholder="Name" value={user.name} onChange={onChangeInput} />
                <input type="text" name="surname" required
                    placeholder="Surname" value={user.surname} onChange={onChangeInput} />
                <input type="email" name="email" required
                    placeholder="Email" value={user.email} onChange={onChangeInput} />
                <input type="password" name="password" required autoComplete="on"
                    placeholder="Password" value={user.password} onChange={onChangeInput} />
                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;