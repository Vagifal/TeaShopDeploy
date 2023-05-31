import React, { useContext } from 'react';
import { MainState } from '../../../../MainState';

import './LoadButton.css';

const LoadButton = () => {
    const state = useContext(MainState);
    const [page, setPage] = state.productAPI.page;
    const [result] = state.productAPI.result;

    return (
        <div className="load-button">
            {
                result < page * 12 ? "" : <button onClick={() => setPage(page + 1)}>Load more products</button>
            }
        </div>
    );
};

export default LoadButton;