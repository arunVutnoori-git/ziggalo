import React from 'react'
import './cart-dropdown.styles.scss'

import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'

import { withRouter } from 'react-router'

import { selectCartItems } from '../../redux/cart/cart.selectors'
import {toggleHiddenCart} from '../../redux/cart/cart.actions'

const CartDropdown = ({cartItems , history , dispatch}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {   
                (cartItems.length) ?
                cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}></CartItem>)
                : <h3 className='cart-empty'>Your Cart is Empty</h3>
            }
        </div>
        <CustomButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleHiddenCart())
        }}>Go to checkout</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));
