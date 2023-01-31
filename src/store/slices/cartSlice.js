import { createSlice } from '@reduxjs/toolkit';


const initialState = {

    discountProduct: [],
    cartProduct: [],
    offerProduct: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItemId = action.payload.id;
            const existingItem = state.cartProduct.find(item => item.id === newItemId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.cartProduct.push(action.payload);
            }
        },

        addDiscountItem(state, action) {
            const newItemId = action.payload.id;
            const existingItem = state.discountProduct.find(item => item.id === newItemId);
            if (existingItem ) {
                existingItem.quantity++;
            } else {
                state.discountProduct.push(action.payload);
            }
        },

        removeItem(state, action) {
            state.cartProduct = state.cartProduct.filter(item => item.id !== action.payload);
        },

        incrementItem(state, action) {
            state.cartProduct = state.cartProduct.map(item => {
                if (item.id === action.payload) {
                    item.quantity++;
                }
                return item;
            });
        },

        decrementItem(state, action) {
            state.cartProduct = state.cartProduct.map(item => {
                if (item.id === action.payload) {
                    item.quantity--;
                }
                return item;
            }).filter(item => item.quantity !== 0);
        },

        incrementDiscountedItem(state, action) {
            state.discountProduct = state.discountProduct.map(item => {
                if (item.id === action.payload) {
                    item.quantity++;
                }
                return item;
            });
        },

        decrementDiscountedItem(state, action) {
            state.discountProduct = state.discountProduct.map(item => {
               
                if (item.id === action.payload) {
                    item.quantity--;
                }
                return item;
            }).filter(item => item.quantity !== 0);
        },
        addOffers(state , action){
            state.offerProduct.push(action.payload)
        },

        removeDiscount(state, action) {
            state.discountProduct = state.discountProduct.filter(item => item.id !== action.payload);
        },


    }
});


export const { removeDiscount, addOffers, addItem, removeItem, incrementItem, decrementItem,incrementDiscountedItem,addDiscountItem,decrementDiscountedItem } = cartSlice.actions;
export default cartSlice.reducer; 