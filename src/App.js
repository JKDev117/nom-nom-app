import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import MenuListPage from './components/MenuListPage/MenuListPage';
import MealPlanPage from './components/MealPlanPage/MealPlanPage';
import AddMenuItem from './components/AddMenuItem/AddMenuItem';
import EditMenuItem from './components/EditMenuItem/EditMenuItem';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import Nav from './components/Nav/Nav';
import MyProvider from './MyProvider';
import TokenService from './services/token-service';
import AuthApiService from './services/auth-api-service';
import IdleService from './services/idle-service';
//import { LIST, PLAN } from '../store/store.js';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import config from './config';


class App extends React.Component {

  componentDidMount() {
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle)

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets()

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken()
      })
    }
  }

  
  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets()
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry()
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken()
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry()
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets()
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate()
  }


  render(){
    console.log('@App.js render')
    return (
       <main className='App'>
         <Nav />
         <MyProvider>
            <Switch>
                <Route exact path='/' component={LandingPage} /> 
                <PublicOnlyRoute path='/login' component={LoginPage}/>
                <PublicOnlyRoute path='/register' component={RegistrationPage}/>
                <PrivateRoute path='/menu' component={MenuListPage}/>
                <PrivateRoute path='/meal-plan' component={MealPlanPage}/>
                <PrivateRoute path='/add-menu-item' component={AddMenuItem} />
                <PrivateRoute path='/edit-menu-item/:item_id' component={EditMenuItem} />
                <Route component={NotFoundPage} />
            </Switch>
        </MyProvider>    
       </main>
    );
  }
}




export default App;



