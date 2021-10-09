import CartActionTypes from './cart.types'
import { addItemToCart, removeItem, removeItemFromCart } from './cart.utils'

const INIT_STATE = {
    hidden : true,
    cartItems : [],
    priceTotal : 0
}

const CartReducer = (state = INIT_STATE,action) => {
    switch(action.type) {
        case CartActionTypes.TOGGLE_HIDDEN_CART : return {
            ...state,
            hidden : !state.hidden
        }
        case CartActionTypes.ADD_ITEM : return {
            ...state,
            cartItems : addItemToCart(state.cartItems , action.payload)
        }
        case CartActionTypes.REMOVE_ITEM_FROM_CART : return {
            ...state,
            cartItems : removeItemFromCart(state.cartItems,action.payload)
        }
        case CartActionTypes.REMOVE_ITEM : return {
            ...state,
            cartItems : removeItem(state.cartItems,action.payload)
        }
        default : 
        return state
    }
}

export default CartReducer;