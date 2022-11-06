import { CART_ACTION_TYPES } from './cart.types'
import { createAction } from '../../utils/reducer/reducer.utils'

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    )
    // if Found increament quantity
    if (existingCartItem){
        return cartItems.map( 
            (cartItem) => cartItem.id === productToAdd.id 
            ? {...cartItem, quantity : cartItem.quantity + 1}
            : cartItem
        )
    }
    // return new array with modified cartItems new cart item
    return [ ...cartItems, { ...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, productToRemove) => {
        // find the cart tiem to remove
        const existingCartItem = cartItems.find(
            (cartItem) => cartItem.id === productToRemove.id
        )

        // check if quantity is equal to 1, if it is remove that item from the cart
        if (existingCartItem.quantity === 1){
            return cartItems.filter(
                cartItem => cartItem.id !== productToRemove.id
            )
        }

        //return back cartitems with matching cart item with reduced quantity
        return cartItems.map( 
            (cartItem) => cartItem.id === productToRemove.id 
            ? {...cartItem, quantity : cartItem.quantity - 1}
            : cartItem
        )
}

const clearCartItem = (cartItems,cartItemToClear) => 
    cartItems.filter(
        cartItem => cartItem.id !== cartItemToClear.id
    )

export const setIsCartOpen = (boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}