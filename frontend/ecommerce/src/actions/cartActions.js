import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

import Cookie from 'js-cookie';

const addToCart = (productId, qtde) => async (dispatch, getState) => {
    try 
    {
        const { data } = await axios.get("/api/products/" + productId);
        dispatch({ 
            type: CART_ADD_ITEM, payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qtde
        }});
        const { cart:{cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }
    catch(error){}
}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

export {addToCart, removeFromCart}