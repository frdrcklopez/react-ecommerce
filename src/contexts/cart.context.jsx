import { createContext, useReducer } from "react"
import { createAction } from "../utils/reducer/reducer.utils"

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

const clearCartItem = (cartItems,cartItemToClear) => {
    cartItems.filter(
        cartItem => cartItem.id !== cartItemToClear.id
    )
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const INITIAL_STATE = {
    isCartOpen : false,
    cartItems : [],
    cartCount : 0,
    cartTotal : 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS : 
        return {
            ...state,
            ...payload
        }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN : 
        return {
            ...state,
            isCartOpen : payload,
        }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    }
} 

export const CartContext = createContext({
    isCartOpen: false,  
    setIsCartOpen : () => {},
    cartItems : [],
    addItemToCart : () => {},
    removeItemToCart : () => {},
    clearItemFromCart : () => {},
    cartCount : 0,
    cartTotal : 0
})

export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartCount, cartTotal, cartItems }, dispatch] = useReducer(
        cartReducer,
        INITIAL_STATE
    );
    
    const updateCartItemsReducer = (cartItems) => {
        //generate newCartTotal
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        
        //generate newCartCount
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );
      
        const payload = {
            cartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal,
        };
      
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
        /*
        dispatch new action with payload = {
            newCartitems,
            newCartTotal,
            newCartCount
        }
        */ 
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    const removeItemToCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemToCart, 
        clearItemFromCart,
        cartItems, 
        cartCount,
        cartTotal
    }
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}