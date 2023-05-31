import React, { useContext, useState } from 'react';
import axios from 'axios';

import { MainState } from '../../../MainState';
import Product from './product/Product';
import Loading from '../utils/loading/Loading';
import FilterPanel from './filterPanel/FilterPanel';
import LoadButton from './loadButton/LoadButton';
import './Products.css';

const Products = () => {
    const state = useContext(MainState);
    const [products, setProducts] = state.productAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [isCheck, setIsCheck] = useState(false);

    const cheackProductHandler = (id) => {
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        });

        setProducts([...products]);
    };

    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck;
        })

        setProducts([...products]);
        setIsCheck(!isCheck);
    };

    const deleteSelected = () => {
        if (window.confirm("Do you really want to delete selected products?")) {
            products.forEach(product => {
                const deleteProduct = async () => {
                    const deleteImage = axios.post('http://localhost:5000/asset/delete', { public_id: product.image.public_id }, {
                        headers: { Authorization: token }
                    });
                    const deleteProduct = axios.delete(`http://localhost:5000/product/${product._id}`, {
                        headers: { Authorization: token }
                    });

                    await deleteImage;
                    await deleteProduct;
                }

                if (product.checked)
                    deleteProduct();
            });

            window.location.href = '/products';
        }
    };


    const deleteProductHandler = async (id, public_id) => {
        if (window.confirm("Do you really want to delete this product?")) {
            try {
                const deleteImage = axios.post('http://localhost:5000/asset/delete', { public_id }, {
                    headers: { Authorization: token }
                });
                const deleteProduct = axios.delete(`http://localhost:5000/product/${id}`, {
                    headers: { Authorization: token }
                });

                await deleteImage;
                await deleteProduct;

                window.location.href = '/products';

            } catch (error) {
                alert(error.response.data.message);
            }
        }
    };

    return (
        <>
            <FilterPanel />
            {
                isAdmin &&
                <div className="delete-all">
                    <span>Select all</span>
                    <input type="checkbox" checked={isCheck} onChange={checkAll} />
                    <button onClick={deleteSelected}>Delete selected</button>
                </div>
            }
            <div className="products">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        isAdmin={isAdmin}
                        deleteHandler={deleteProductHandler}
                        cheackHandler={cheackProductHandler}
                    />)
                }
            </div>
            <LoadButton />
            {products.length === 0 && <Loading />}
        </>
    );
};

export default Products;