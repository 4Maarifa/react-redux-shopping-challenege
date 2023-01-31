import React from 'react';
import { ShoppingCart } from '@mui/icons-material'
import productsData from '../data/productsData';
import ProductsCard from '../components/ProductsCard';
import Cart from '../components/Cart';
const Home = () => {
    return (
        <>
            <section id="home">
                <div className="container">
                    <div className="products_content">
                        <h1>PRODUCTS</h1>
                        {
                            productsData.map((item) => (
                                <ProductsCard key={item.id} {...item} />
                            ))
                        }
                    </div>
                    <div className="cart_contents">
                        <div className='cartHeader'>
                       <h1>Cart</h1>
                       <ShoppingCart id='badge'/>
                        </div>
                       <Cart/>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;