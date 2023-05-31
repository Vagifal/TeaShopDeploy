import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { MainState } from '../../../MainState';
import Product from '../products/product/Product';
import './ProductPage.css';

const ProductPage = () => {
    const params = useParams();
    const state = useContext(MainState);
    const [products] = state.productAPI.products;
    const addBasket = state.userAPI.addBasket;
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id)
                    setProductData(product);
            });
        }
    }, [params.id, products]);

    if (productData.length === 0) return null;

    return (
        <>
            <div className="product-page">
                <img src={productData.image.url} alt="" />
                <div className="product-details">
                    <div className="row">
                        <h2>{productData.title}</h2>
                        <h6>#id: {productData.product_id}</h6>
                    </div>
                    <span>€ {productData.price}</span>
                    <br></br>
                    <p>{productData.description}</p>
                    <p>{productData.content}</p>
                    <p style={{ fontWeight: 'bold', margin: '30px 0' }}>Sold: {productData.sold}</p>
                    <Link to="/basket" className="basket"
                        onClick={() => addBasket(productData)}>
                        Add to Basket
                    </Link>
                </div>
            </div>
            <div>
                <h2>Similar products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === productData.category && product._id !== productData._id
                                ? <Product key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default ProductPage;