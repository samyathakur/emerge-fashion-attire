import React from 'react';
import {Switch, Route, Redirect}  from 'react-router-dom';
import { connect } from 'react-redux'

import {setCurrentUser} from './redux/user/user.actions'

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';
// importing auth on this page helps us to store state of user through out the project

class App extends React.Component {
  

unsubscribeFromAuth = null;

  componentDidMount(){

    const{setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(
      async userAuth => { // user is async as we are going to make API request to firestore
        if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);
          
          userRef.onSnapshot(snapShot => {

            setCurrentUser({
                id : snapShot.id,
                ...snapShot.data()
              });
          });
          
        }
        else{
          setCurrentUser(userAuth)
        }
        
      }
    );
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div >
        <Header />

        <Switch>
          <Route exact path="/" component ={HomePage}/>
          <Route path="/shop" component ={ShopPage}/>
          <Route 
          exact 
          path="/signin" 
          render={()=>
            this.props.currentUser ?
            (<Redirect to = '/'/>)
            :
            (<SignInAndSignUpPage/>)
          }
          />
        </Switch>
      </div>
    );
    }

}

// allow access to state of user so that after login user cannot access sign in page
// {user} is destructured from "state" parameter
const mapStateToProps = ({user}) => ({
  currentUser : user.currentUser
})

//update reducer value with new user action
const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
