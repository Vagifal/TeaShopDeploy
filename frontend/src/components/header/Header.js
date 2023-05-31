import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { MainState } from '../../MainState';
import Menu from './icons/menu.svg';
import Close from './icons/close.svg';
import Basket from './icons/basket.svg';
import './Header.css';

const Header = () => {
    const state = useContext(MainState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [basket] = state.userAPI.basket;

    const [menu, setMenu] = useState(false);

    const logoutUser = async () => {
        await axios.get('https://tea-shop-be.onrender.com/user/logout');
        localStorage.removeItem('firstLogin');
        window.location.href = "/";
    };

    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create-product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    };

    const loggedRouter = () => {
        return (
            <>
                <li><Link to={isAdmin ? '/orders' : '/profile'}>{isAdmin ? 'Orders' : 'Profile'}</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    };

    const styleMenu = {
        left: menu ? 0 : "-100%"
    };

    return (
        <header>
            <div className='menu' onClick={() => setMenu(!menu)}>
                <img src={Menu} alt='Menu' width='30' />
            </div>
            <div className='logo'>
                <h1>
                    <Link to="/">{isAdmin ? 'Admin Panel' : "Vagif's Tea Shop ♨"}</Link>
                </h1>
            </div>
            <ul style={styleMenu}>
                {!isAdmin && <li><Link to='/'>Home</Link></li>}
                <li><Link to='/products'>{isAdmin ? 'Products' : 'Shop'}</Link></li>

                {isAdmin && adminRouter()}

                {isLogged ? loggedRouter() : <li><Link to='/login'>Login</Link></li>}

                {isLogged ? '' : <li><Link to='/register'>Register</Link></li>}

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt='Close' width='30' className='menu' />
                </li>
            </ul>

            {
                isAdmin ? '' : (
                    <div className='basket-icon'>
                        <span>{basket.length}</span>
                        <Link to='/basket'>
                            <img src={Basket} alt='Basket' width='30' />
                        </Link>
                    </div>
                )
            }
        </header>
    );
};

export default Header;