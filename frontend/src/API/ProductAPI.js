import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductAPI = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`http://localhost:5000/product?limit=${page * 12}&${category}&${sort}&title[regex]=${search}`);
            setProducts(res.data.products);
            setResult(res.data.result);
        }
        getProducts();
    }, [category, sort, search, page]);

    return {
        products: [products, setProducts],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    };
};

export default ProductAPI;