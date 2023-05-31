import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { MainState } from '../../../../../MainState';
import './ProductButtons.css';

const ProductButtons = ({ product, deleteHandler }) => {
    const state = useContext(MainState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addBasket = state.userAPI.addBasket;

    return (
        <div className="product-buttons">
            {
                isAdmin ? <>
                    <Link
                        id="button-buy"
                        to=""
                        onClick={() => deleteHandler(product._id, product.image.public_id)}
                    >Delete</Link>
                    <Link
                        id="button-view"
                        to={`/edit-product/${product._id}`}
                    >Edit</Link>
                </> : <>
                    <Link
                        id="button-buy"
                        to=""
                        onClick={() => addBasket(product)}
                    >Add</Link>
                    <Link
                        id="button-view"
                        to={`/detail/${product._id}`}
                    >View</Link>
                </>
            }
        </div>
    );
};

export default ProductButtons;