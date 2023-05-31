import React, { useContext } from 'react';
import { Slide } from 'react-slideshow-image';

import { MainState } from '../../../MainState';
import Product from '../products/product/Product';
import 'react-slideshow-image/dist/styles.css';
import './Home.css';

const Home = () => {
    const state = useContext(MainState);
    const [products] = state.productAPI.products;

    return (
        <div className='home'>
            <Slide>
                <div className="each-slide-effect">
                    <div style={{ backgroundImage: 
                        'url("https://res.cloudinary.com/dgbwkq1mh/image/upload/v1683134267/other/tea3_gkvilg.jpg")' }}>
                        <span>High quality teas</span>
                    </div>
                </div>
                <div className="each-slide-effect">
                    <div style={{ backgroundImage: 
                        'url("https://res.cloudinary.com/dgbwkq1mh/image/upload/v1683134267/other/tea2_jsji4h.jpg")' }}>
                        <span>Best prices</span>
                    </div>
                </div>
                <div className="each-slide-effect">
                    <div style={{ backgroundImage: 
                        'url("https://res.cloudinary.com/dgbwkq1mh/image/upload/v1683134254/other/tea1_nrd4mi.jpg")' }}>
                        <span>Fast delivery</span>
                    </div>
                </div>
            </Slide>
            <h2>Some products</h2>
            <div className='products'>
                {
                    products.slice(0, 4).map((product) => <Product key={product._id} product={product} />)
                }
            </div>
        </div>
    );
};

export default Home;