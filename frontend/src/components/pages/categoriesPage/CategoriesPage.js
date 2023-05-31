import React, { useState, useContext } from 'react';
import axios from 'axios';

import { MainState } from '../../../MainState';
import './CategoriesPage.css';

const CategoriesPage = () => {
    const state = useContext(MainState);
    const [categories] = state.categoryAPI.categories;
    const [token] = state.token;

    const [category, setCategory] = useState('');
    const [onEdit, setOnEdit] = useState(false);
    const [id, setID] = useState('');

    const createCategory = async e => {
        e.preventDefault();
        try {
            if (onEdit) {
                const res = await axios.put(`http://localhost:5000/category/${id}`, { name: category }, {
                    headers: { Authorization: token }
                });
                alert(res.data.message);
            } else {
                const res = await axios.post('http://localhost:5000/category', { name: category }, {
                    headers: { Authorization: token }
                });
                alert(res.data.message);
            }
            setOnEdit(false);
            setCategory('');
            window.location.reload();

        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const editCategory = async (id, name) => {
        setID(id);
        setCategory(name);
        setOnEdit(true);
    };

    const deleteCategory = async id => {
        try {
            const res = await axios.delete(`http://localhost:5000/category/${id}`, {
                headers: { Authorization: token }
            });
            alert(res.data.message);
            window.location.reload();

        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} required
                    onChange={e => setCategory(e.target.value)} />

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>

            <div className="col">
                {
                    categories.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                <button onClick={() => deleteCategory(category._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CategoriesPage;