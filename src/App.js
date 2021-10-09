import React,{lazy,Suspense} from 'react'
import './App.css';


// import HomePage from './pages/homepage/home.component';
// import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
// import SignInPage from './pages/sign-in-page/sign-in-page.component'
// import CheckoutPage from './pages/checkout/checkout.component';

import {Route , Switch , Redirect} from 'react-router-dom'
import {auth,createUserProfileDocument} from './firebase/firebase.util'

import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';

import {setCurrentUser} from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selectors'
import {selectCollectionForPreview} from './redux/shop/shop.selectors'
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/home.component'))
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const SignInPage = lazy(() => import('./pages/sign-in-page/sign-in-page.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'))

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
        if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapshot =>
            {
             setCurrentUser({
                    id : snapshot.id,
                    ...snapshot.data()
                  }
              );
            }
            );  
        }  

        else setCurrentUser(userAuth);

    
    }
    )
  }  

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div >
        <Header></Header>
        <Switch>
          <ErrorBoundary>
          <Suspense fallback={<Spinner></Spinner>}>
            <Route exact path='/' component={HomePage}></Route>
            <Route path='/shop' component={ShopPage}></Route>
            <Route exact path='/checkout' component={CheckoutPage}></Route>
            <Route exact path='/signin' render={() => (this.props.currentUser ? 
            <Redirect to='/'></Redirect> : <SignInPage></SignInPage>)}></Route>
          </Suspense>
          </ErrorBoundary>  
        </Switch>
       
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
  collections : selectCollectionForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
