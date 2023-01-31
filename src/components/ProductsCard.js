import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem,addDiscountItem } from '../store/slices/cartSlice';
import offerData from '../data/offerData';

const ProductsCard = (props) => {

    const { img,desc, rating, title, price } = props;

    const [isAdded, setIsAdded] = useState(false);
    const [disble, setDisble] = useState(false);

    const dispatch = useDispatch();

    const handleAddToCart = () => {

        // here, we cannot directly pass the `props` as it is, if we need to access the same value within the child component. So, we've to pass it as a different prop like this- `{...props}`
        const item = { ...props };
        dispatch(addItem(item));
        const offer = offerData.find(i => i.id === item.id); 
        if(offer)
          dispatch(addDiscountItem( {id:offer.itemId,quantity: Math.trunc(item.quantity  / offer.quantity),price: offer.price}));
        setIsAdded(true);
        setDisble(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 1000);
    };


    return (
        <>
            <div className="product_card">

                <img src={img} alt="item-img" />
                <div className='middle-section'>
                    <h4 className="title">{title}</h4>
                    <h5 className="desc">{desc} </h5>
                </div>
                <div className='right-section '>
                <strong className="rating">{rating}</strong>
                <h3 className="price">£ {price.toLocaleString(undefined, {minimumFractionDigits: 2}) }</h3>
               
                <button
                    type="button"
                    className={`btn ${isAdded ? 'added' : ''}`}
                    onClick={handleAddToCart}
                    disabled={disble}
                    >
                     ADD TO CART
                </button>
                </div>
                  
            </div>
        </>
    );
};

export default ProductsCard;