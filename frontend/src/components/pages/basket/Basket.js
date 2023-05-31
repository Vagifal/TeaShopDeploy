import React, { useContext, useState, useEffect } from 'react';
import { MainState } from '../../../MainState';
import axios from 'axios';
import PaypalButton from './PaypalButton';
import './Basket.css';

const Basket = () => {
    const state = useContext(MainState);
    const [basket, setBasket] = state.userAPI.basket;
    const [total, setTotal] = useState(0);
    const [token] = state.token;

    useEffect(() => {
        const getTotal = () => {
            const total = basket.reduce((prev, item) => {
                return prev + (item.price * item.quantity);
            }, 0);

            setTotal(total);
        };

        getTotal();

    }, [basket]);

    const increment = (id) => {
        basket.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        });

        setBasket([...basket]);
        updateBasket(basket);
    };

    const decrement = (id) => {
        basket.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        });

        setBasket([...basket]);
        updateBasket(basket);
    };

    const removeProduct = id => {
        if (window.confirm("Do you want to delete this product?")) {
            basket.forEach((item, index) => {
                if (item._id === id) {
                    basket.splice(index, 1)
                }
            });

            setBasket([...basket]);
            updateBasket(basket);
        }
    };

    const updateBasket = async (basket) => {
        await axios.patch('http://localhost:5000/user/addBasket', { basket }, {
            headers: { Authorization: token }
        });
    };

    const onSuccess = async (data) => {
        const id = data.id;
        const address = data.purchase_units[0].shipping.address;

        await axios.post('http://localhost:5000/order', { basket, id, address }, {
            headers: { Authorization: token }
        });

        setBasket([]);
        updateBasket([]);
    };

    if (basket.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "3rem", marginTop: "30px" }}>Basket Empty</h2>;

    return (
        <div className='basket-items'>
            {
                basket.map(product => (
                    <div className="basket-item" key={product._id}>
                        <img src={product.image.url} alt="" />

                        <div className="product-details">
                            <h2>{product.title}</h2>

                            <h3>$ {product.price}</h3>
                            <p>{product.description}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>

                            <div className="delete" onClick={() => removeProduct(product._id)}>X</div>
                        </div>
                    </div>
                ))
            }
            <div className="total">
                <h3>Total: €{total}</h3>
                <PaypalButton total={total} onSuccess={onSuccess} />
            </div>
        </div>
    );
};

export default Basket;