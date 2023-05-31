import React, { useContext, useEffect } from 'react';
import { MainState } from '../../../MainState';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './OrdersPage.css';

const OrdersPage = () => {
    const state = useContext(MainState);
    const [orders, setOrders] = state.userAPI.orders;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;

    useEffect(() => {
        if (token) {
            const getOrders = async () => {
                if (isAdmin) {
                    const res = await axios.get('https://tea-shop-be.onrender.com/order', {
                        headers: { Authorization: token }
                    });

                    setOrders(res.data);
                } else {
                    const res = await axios.get('https://tea-shop-be.onrender.com/user/orders', {
                        headers: { Authorization: token }
                    });

                    setOrders(res.data);
                }
            };
            getOrders();
        }
    }, [token, isAdmin, setOrders]);

    return (
        <div className="orders-page">
            <h2>Orders</h2>
            <h4>There are {orders.length} orders</h4>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date of purchase</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(items => (
                            <tr key={items._id}>
                                <td>{items.id}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/order/${items._id}`}>View</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;