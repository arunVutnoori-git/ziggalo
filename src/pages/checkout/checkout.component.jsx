import React from 'react'
import './checkout.styles.scss'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import {connect} from 'react-redux'
import {selectCartItems, selectCartItemsTotal} from '../../redux/cart/cart.selectors'
import { createStructuredSelector } from 'reselect'

const CheckoutPage = ({cartItems, priceTotal}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
            <span>Item</span>
            </div>
            <div className='header-block'>
            <span>Details</span>
            </div>
            <div className='header-block'>
            <span>Quantity</span>
            </div>
            <div className='header-block'>
            <span>Price</span>
            </div>
            <div className='header-block'>
            <span>Item Total</span>
            </div>
            <div className='header-block'>
            <span>Remove</span>            
            </div>
        </div>
        {
            cartItems.map(
                cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}></CheckoutItem>
            )
        }
        <div className='total'>Total : ${priceTotal}</div>
    </div>

)

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems,
    priceTotal : selectCartItemsTotal
})

export default connect(mapStateToProps)(CheckoutPage);