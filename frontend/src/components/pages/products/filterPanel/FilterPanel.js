import React, { useContext, useState } from 'react';
import { MainState } from '../../../../MainState';

import './FilterPanel.css';

const FilterPanel = () => {
    const state = useContext(MainState);
    const [categories] = state.categoryAPI.categories;
    const [category, setCategory] = state.productAPI.category;
    const [sort, setSort] = state.productAPI.sort;
    const [search, setSearch] = state.productAPI.search;
    const [query, setQuery] = useState('');

    const handleCategory = e => {
        setCategory(e.target.value);
        setSearch('');
    };

    const searchHandler = () => {
        setSearch(query);
    };

    const clearHandler = () => {
        setSearch('');
        setQuery('');
    };

    return (
        <div className="filter-panel">
            <div className="row">
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>All</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={query} placeholder="Search"
                onChange={e => setQuery(e.target.value.toLowerCase())} />

            <button onClick={searchHandler}>Search</button>

            <button onClick={clearHandler}>Clear</button>

            <div className="row sort">
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Default</option>
                    <option value='sort=-sold'>Bestseller</option>
                    <option value='sort=-price'>Price: from high</option>
                    <option value='sort=price'>Price: from low</option>
                </select>
            </div>
        </div>
    );
};

export default FilterPanel;