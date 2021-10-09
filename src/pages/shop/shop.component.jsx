import React from 'react';
import './shop.styles.scss';

import {Route} from 'react-router-dom'



import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component'

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import {connect} from 'react-redux'

import {firestore,convertCollectionsToMap} from '../../firebase/firebase.util'
import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {

    state = {
        isLoading : true,
    }
    

    componentDidMount() {

        const collectionsRef = firestore.collection('collections')

        const {updateCollectionsMap} = this.props;

        collectionsRef.get().then(async snapshot => {
            
            const collectionsMap = convertCollectionsToMap(snapshot);
            
            updateCollectionsMap(collectionsMap);
            this.setState({
                isLoading : false
            })
            }
        )     
    }

    render() {
        const {match} = this.props;
        const {isLoading} = this.state;

        return(   
            <div className='shop-page'>
                <Route exact path={`${match.path}`} 
                render={
                    (props) => <CollectionOverviewWithSpinner isLoading={isLoading}  {...props}></CollectionOverviewWithSpinner>
                }
                ></Route>
                <Route path={`${match.path}/:collectionId`} 
                render={
                    (props) => <CollectionPageWithSpinner isLoading={isLoading} {...props}></CollectionPageWithSpinner>
                }
                ></Route>
            </div>
        )      

    }
    
    
}

const mapDispatchToProps = dispatch => ({
    updateCollectionsMap : collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null,mapDispatchToProps)(ShopPage);