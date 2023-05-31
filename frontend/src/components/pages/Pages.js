import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Products from './products/Products';
import Login from './login/Login';
import Register from './register/Register';
import Basket from './basket/Basket';
import NotFound from './notFound/NotFound';
import Home from './home/Home';
import ProductPage from './productPage/ProductPage';
import Profile from './profile/Profile';
import OrderPage from './orderPage/OrderPage';
import OrdersPage from './ordersPage/OrdersPage';
import CategoriesPage from './categoriesPage/CategoriesPage';
import CreateProduct from './createProduct/CreateProduct';
import { MainState } from '../../MainState';

const Pages = () => {
    const state = useContext(MainState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;

    return (
        <Routes>
            <Route path="/" exact element={isAdmin ? <OrdersPage /> : <Home />} />
            <Route path="/detail/:id" exact element={<ProductPage />} />
            <Route path="/products" exact element={<Products />} />
            <Route path="/login" exact element={isLogged ? <NotFound /> : <Login />} />
            <Route path="/register" exact element={isLogged ? <NotFound /> : <Register />} />
            <Route path="/basket" exact element={<Basket />} />
            <Route path="/category" exact element={<CategoriesPage />} />
            <Route path="/profile" exact element={isLogged ? <Profile /> : <NotFound />} />
            <Route path="/orders" exact element={isLogged ? <OrdersPage /> : <NotFound />} />
            <Route path="/order/:id" exact element={isLogged ? <OrderPage /> : <NotFound />} />
            <Route path="/create-product" exact element={isAdmin ? <CreateProduct /> : <NotFound />} />
            <Route path="/edit-product/:id" exact element={isAdmin ? <CreateProduct /> : <NotFound />} />
            <Route path="*" exact element={<NotFound />} />
        </Routes>
    );
};

export default Pages;