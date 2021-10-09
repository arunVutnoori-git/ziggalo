import React from 'react'
import './custom-button.styles.scss'

const CustomButton = ({children, isGooleSignIn, inverted, ...otherProps}) => (
    
    <button className={`
    ${inverted ? 'inverted' : ''}
    ${isGooleSignIn ? 'is-google-signin' : ''} custom-button`} {...otherProps}>
        {children}
    </button>
)

export default CustomButton;