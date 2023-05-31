import React from 'react';

import ProductButtons from './productButtons/ProductButtons';
import './Product.css';

const Product = ({ product, isAdmin, deleteHandler, cheackHandler }) => {
    return (
        <div className="product">
            {
                isAdmin && <input type="checkbox" checked={product.checked} onChange={() => cheackHandler(product._id)} />
            }
            <img
                src={product.image.url}
                alt={product.title}
                onClick={() => window.location.href = isAdmin ? `/edit-product/${product._id}` : `/detail/${product._id}`}
            />
            <div className="product-info">
                <h2 title={product.title}>{product.title}</h2>
                <span>€{product.price} / 100gr</span>
                <p>{product.description}</p>
            </div>
            <ProductButtons product={product} deleteHandler={deleteHandler} />
        </div>
    );
};

export default Product;