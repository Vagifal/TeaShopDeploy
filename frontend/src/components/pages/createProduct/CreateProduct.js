import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { MainState } from '../../../MainState';
import Loading from '../utils/loading/Loading';
import './CreateProduct.css';

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id: ''
};

const CreateProduct = () => {
    const state = useContext(MainState);
    const [categories] = state.categoryAPI.categories;
    const [isAdmin] = state.userAPI.isAdmin;
    const [products] = state.productAPI.products;
    const [token] = state.token;

    const [onEdit, setOnEdit] = useState(false);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(initialState);

    const param = useParams();

    const styleUpload = {
        display: image ? "block" : "none"
    };

    useEffect(() => {
        if (param.id) {
            setOnEdit(true);

            products.forEach(product => {
                if (product._id === param.id) {
                    setProduct(product);
                    setImage(product.image);
                }
            });
        } else {
            setOnEdit(false);
            setProduct(initialState);
            setImage(false);
        }
    }, [param.id, products]);

    const handleUpload = async e => {
        e.preventDefault();
        try {
            if (!isAdmin)
                return alert("You're not an admin");

            const file = e.target.files[0];

            if (!file)
                return alert("File not exist");

            if (file.size > 1024 * 1024)
                return alert("Size too large!");

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert("File format is incorrect");

            let formData = new FormData();
            formData.append('file', file);

            setLoading(true);

            const res = await axios.post('https://tea-shop-be.onrender.com/asset/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            });

            setLoading(false);
            setImage(res.data);

        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleDelete = async () => {
        try {
            if (!isAdmin)
                return alert("You're not an admin");

            setLoading(true);
            await axios.post('https://tea-shop-be.onrender.com/asset/delete', { public_id: image.public_id }, {
                headers: { Authorization: token }
            });

            setLoading(false);
            setImage(false);

        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (!isAdmin)
                return alert("You're not an admin");

            if (!image)
                return alert("No Image Upload");

            if (onEdit) {
                await axios.put(`https://tea-shop-be.onrender.com/product/${product._id}`, { ...product, image }, {
                    headers: { Authorization: token }
                });
            } else {
                await axios.post('https://tea-shop-be.onrender.com/product', { ...product, image }, {
                    headers: { Authorization: token }
                });
            }

            window.location.href = "/products";

        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className='create-product'>
            <div className="upload">
                <input type="file" name="file" id="file-upload" onChange={handleUpload} />
                {
                    loading ? <div id="file-image" ><Loading /></div> :
                        <div id="file-image" style={styleUpload}>
                            <img src={image ? image.url : ''} alt="" />
                            <span onClick={handleDelete}>X</span>
                        </div>
                }
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                        value={product.product_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                        value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                        value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                        value={product.description} rows="2" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                        value={product.content} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    );
};

export default CreateProduct;