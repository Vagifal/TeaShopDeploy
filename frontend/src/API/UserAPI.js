import { useState, useEffect } from 'react';
import axios from 'axios';

const UserAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [basket, setBasket] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('https://tea-shop-be.onrender.com/user/info', {
                        headers: { Authorization: token }
                    });

                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                    setBasket(res.data.basket);

                } catch (error) {
                    alert(error.response.data.message);
                }
            };
            getUser();
        }
    }, [token]);

    const addBasket = async (product) => {
        if (!isLogged) return alert("Please login to continue buying");

        const check = basket.every(item => {
            return item._id !== product._id
        });

        if (check) {
            setBasket([...basket, { ...product, quantity: 1 }]);

            await axios.patch('https://tea-shop-be.onrender.com/user/addBasket', { basket: [...basket, { ...product, quantity: 1 }] }, {
                headers: { Authorization: token }
            });

        } else {
            alert("This product has been added to basket");
        }
    };

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        basket: [basket, setBasket],
        addBasket: addBasket,
        orders: [orders, setOrders]
    };
};

export default UserAPI;
