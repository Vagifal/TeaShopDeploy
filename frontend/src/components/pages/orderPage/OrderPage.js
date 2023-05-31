import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { MainState } from '../../../MainState';
import './OrderPage.css';

const OrderPage = () => {
    const state = useContext(MainState);
    const [orders] = state.userAPI.orders;

    const [orderDetails, setOrderDetails] = useState([]);

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            orders.forEach(item => {
                if (item._id === params.id)
                    setOrderDetails(item);
            });
        }
    }, [params.id, orders]);

    if (orderDetails.length === 0) return null;

    return (
        <div className="order-page">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.name}</td>
                        <td style={{ textTransform: 'lowercase' }}>{orderDetails.email}</td>
                        <td>{orderDetails.address.address_line_1 + " - " + orderDetails.address.admin_area_2}</td>
                        <td>{orderDetails.address.postal_code}</td>
                        <td>{orderDetails.address.country_code}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.basket.map(item => (
                            <tr key={item._id}>
                                <td><img src={item.image.url} alt="" /></td>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>$ {item.price * item.quantity}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default OrderPage;