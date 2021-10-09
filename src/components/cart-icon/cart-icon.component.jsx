import React from 'react'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'

import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {toggleHiddenCart} from '../../redux/cart/cart.actions'

import { selectCartItemsCount } from '../../redux/cart/cart.selectors'

const CartIcon = ({toggleHiddenCart , itemCount}) => (
    <div className='cart-icon' onClick={toggleHiddenCart}>
        <ShoppingIcon className='shopping-icon'></ShoppingIcon>
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapStateToProps = createStructuredSelector({
    itemCount : selectCartItemsCount
})

const mapDispatchToProps = dispatch => ({
    toggleHiddenCart : () => dispatch(toggleHiddenCart())
});


export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);