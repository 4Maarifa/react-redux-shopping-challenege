import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementItem, decrementItem,addDiscountItem,decrementDiscountedItem,incrementDiscountedItem } from '../store/slices/cartSlice';
import offerData from '../data/offerData';


import CartItem from './CartItem';

const Cart = () => {

    const { discountProduct, cartProduct } = useSelector((state) => state.cart);
    let DiscountedTotal = 0;
    const cartQuantity = cartProduct.length;
    const cartTotal = cartProduct.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    const [dis, setdis] = useState([0,0]);
    const dispatch = useDispatch();
    const handleIncrement = (itemId) => {
        dispatch(incrementItem(itemId));
        // get the offer details
        // get the offer details
        const offer = offerData.find(i => i.id === itemId); 
        const item = cartProduct.find(i => i.id === itemId); 
        if(offer && item){
            // chech if the offered Item is in the discounted list
            const target = cartProduct.find(i => i.id === offer.itemId); 
            const exist_Item_Discounted = discountProduct.find(i => i.id === offer.itemId);
            if(exist_Item_Discounted){
               // chech if 
               console.log(target.quantity,exist_Item_Discounted.quantity );
               if((item.quantity +1 ) % offer.quantity === 0)
                dispatch(incrementDiscountedItem(offer.itemId));
            }else{
                dispatch(addDiscountItem( {id:offer.itemId,quantity: Math.trunc(target.quantity  / offer.quantity),price: offer.price}));
            }
        } 
    };

    const handleDecrement = (itemId) => {
        const target = cartProduct.find(i => i.id === itemId); 
        dispatch(decrementItem(itemId));
        // get the offer details
        const offer = offerData.find(i => i.id === itemId); 
        // chech if the offered Item is in the discounted list
        if(offer && target){
            const exist_Item_Discounted = discountProduct.find(i => i.id === offer.itemId);
            // if the related item is exist then check the quantity of the ** is lower then the offer
            if(exist_Item_Discounted ){ 
                if(target.quantity % offer.quantity ===  0 && exist_Item_Discounted.quantity > 0 )
                dispatch( decrementDiscountedItem(offer.itemId)); 
            }
        }
    };
    const getPrices = () => {
        let discountedTotal = 0;
        cartProduct.map(item => {
            const DiscountItem = discountProduct.find(i => i.id === item.id);
            if(DiscountItem)
            discountedTotal += DiscountItem.price * Math.min(DiscountItem.quantity, item.quantity);  
            console.log(discountedTotal)
        });

        return discountedTotal;
    }


    return (
        <>
            <div id="cart">
                <div className="cart_content">
                    {cartProduct.map(item => {
                        const { id,img, title,quantity, price } = item;    
                        const exist_Item_Discounted = discountProduct.find((i) => i.id === id);
                        const Total = price * quantity;
                        let DiscountedPrice = 0, DiscountedQuantity = quantity,    discount = 0; 
                        if(exist_Item_Discounted){
                            if(quantity > exist_Item_Discounted.quantity)
                            DiscountedQuantity =  exist_Item_Discounted.quantity ;
                            DiscountedPrice = Total - (exist_Item_Discounted.price * DiscountedQuantity);
                            DiscountedTotal =+ (exist_Item_Discounted.price * DiscountedQuantity);
                             
                            if(exist_Item_Discounted.quantity !== 0)   discount = 1 
                        }
                       return (
                        <div className="cart_items" key={id}>
                        <img className="cartItem__image" src={img} alt="product-img" /> 
                        <div className='cartItem__info'>
                            <div className="cartItem__title">
                              <h4>{title}</h4>
                            </div>
                            <div className="cartItem__incrDec">
                                <p>quantity</p>
                                <button onClick={() =>  handleDecrement(id)}>-</button>
                                <b>{quantity}</b>
                                <button onClick={() => handleIncrement(id)}>+</button>
                            </div>
                        </div>
                        <div className="price_info"> 
                            {discount !== 0 ? (
                               <>
                                <h3 className={'price' } style={{ color: "red" }}><s>£ {Total.toFixed(2)}</s></h3>
                                <h3 className={'price' } style={{ visibility: "visible" }}>£ {DiscountedPrice.toFixed(2)}</h3> 
                               </>
                             ) : (
                                <>
                                <h3 className={'price' }>£ {Total.toFixed(2)}</h3>
                                <h3 className={'price'}style={{ visibility: "hidden" }}>£ {DiscountedPrice.toFixed(2)}</h3> 
                                </>
                             )}
                        </div>
                        </div>     
                       )
                    })}
                </div>

                <div className="cartTotal">
                    <div className='subcarTotal'>
                        <p>Subtotal</p>
                        <b>£ {cartTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</b>
                   </div>
                   <div className='subcarTotal'>
                        <p>Discount</p>
                        <b>£ {getPrices().toFixed(2)}</b>
                   </div>
                   <div className='subcarTotal'>
                        <p>Total</p>
                        <b>£ {(cartTotal - getPrices()).toFixed(2)}</b>
                     
                   </div>
                </div>
            </div>
        </>
    );
};

export default Cart;