import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import ProductAPI from './API/ProductAPI';
import UserAPI from './API/UserAPI';
import CategoryAPI from './API/CategoryAPI';

export const MainState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get('http://localhost:5000/user/refreshToken', { withCredentials: true, credentials: 'include' });

                setToken(res.data.accessToken);

                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000);
            };

            refreshToken();
        }
    }, []);

    const state = {
        token: [token, setToken],
        productAPI: ProductAPI(),
        userAPI: UserAPI(token),
        categoryAPI: CategoryAPI()
    };

    return (
        <MainState.Provider value={state}>
            {children}
        </MainState.Provider>
    );
};