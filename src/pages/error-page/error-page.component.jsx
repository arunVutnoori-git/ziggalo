import React from 'react'
import './error-page.styles.scss'

const ErrorPage = ({errorMessage}) => {

    return(
    <div className='error-page'>
        <h2 className='error-header'>
            Error Loading
        </h2>
        <span>{errorMessage}</span>
    </div>
    )
}

export default ErrorPage;