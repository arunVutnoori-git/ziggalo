import React from 'react';
import './header.styles.scss'
import {ReactComponent as Logo} from '../../assets/ziggalo.svg'
import {Link} from 'react-router-dom'
import {auth} from '../../firebase/firebase.util'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCartHidden } from '../../redux/cart/cart.selectors';

const Header = ({currentUser,hidden}) => (
    <div className='header'>
        <Link to='/' className='logo-container'><Logo></Logo></Link>
        <div className='options'>
            {
                currentUser ?
                <div className='option name-tag'><h4>Hello {currentUser.displayName}</h4></div> : null
            }
            <Link to='/shop' className='option'>SHOP</Link>

            {
                currentUser ?
                <div className='option' onClick={()=> auth.signOut()}>SIGN OUT</div>
                :
                <Link to='/signin' className='option'>SIGN IN</Link>
            }
            
            <Link to='/contact' className='option'>CONTACT</Link>

            <CartIcon className='option'></CartIcon>
        </div>
        {
            hidden ?
            null : 
            <CartDropdown></CartDropdown>
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser,
    hidden : selectCartHidden
})



export default connect(mapStateToProps)(Header);