import React from 'react';
import './collection-preview.styles.scss';

import CollectionItem from '../collection-item/collection-item.component'
import CustomButton from '../custom-button/custom-button.component.jsx'

import {Link} from 'react-router-dom'

const CollectionPreview = ({title , items}) => (

    <div className='collection-preview'>
        <h1>
            <Link to={`${'/shop/' + title.toLowerCase()}`}>{title.toUpperCase()}</Link>
        </h1>
        <div className='preview'>
            {
                items.filter((items,idx)=>(idx<4))
                .map((item)=>(
                    <CollectionItem key={item.id} item={item}></CollectionItem>
                ))
            }
            
        </div>
        <div className='see-more'>
            <Link to={`${'/shop/' + title.toLowerCase()}`} >
                <CustomButton type='button' >See More</CustomButton>
            </Link>
        </div>
    </div>

)

export default CollectionPreview;