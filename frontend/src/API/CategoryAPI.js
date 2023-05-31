import { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryAPI = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get('http://localhost:5000/category');
            setCategories(res.data);
        }

        getCategories();
    }, []);

    return {
        categories: [categories, setCategories],
    };
};

export default CategoryAPI;