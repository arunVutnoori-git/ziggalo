import React from 'react';

import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCollectionForPreview } from '../../redux/shop/shop.selectors';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

const CollectionOverview = ({collection}) => {

    
    return (
    <div className='collection-overview'>
        {
                    collection.map(({id,...otherCollection}) => 
                        (
                        <CollectionPreview key={id} {...otherCollection} >
                        </CollectionPreview>)
                        )
        }
    </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collection : selectCollectionForPreview
})

export default connect(mapStateToProps)(CollectionOverview);