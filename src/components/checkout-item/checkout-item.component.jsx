import React from 'react'
import './checkout-item.styles.scss'

import {connect} from 'react-redux'
import { addItem, removeItem, removeItemFromCartAction } from '../../redux/cart/cart.actions'

const CheckoutItem = ({cartItem ,removeItemFromCart,addItem,removeItem}) => {

    const {name,imageUrl,price,quantity} = cartItem;

    return(
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt='cart-item'></img>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div className='arrows' onClick={()=> removeItem(cartItem)}>&#10094;</div>
            {quantity}
            <div className='arrows' onClick={()=> addItem(cartItem)}>&#10095;</div>
        </span>
        <span className='price'>${price}</span>
        <span className='item-total'>
            <div>
            {
               '$' + quantity * price
            }
            </div>
        </span>
        <div className='remove-button' onClick={()=> removeItemFromCart(cartItem)}>&#10005;</div>
    </div>
    )
}

const mapDispatchToProps = dispatch => ({
    removeItemFromCart : item => dispatch(removeItemFromCartAction(item)),
    addItem : item => dispatch(addItem(item)),
    removeItem : item => dispatch(removeItem(item))
})

export default connect(null,mapDispatchToProps)(CheckoutItem);