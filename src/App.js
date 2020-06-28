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
import MenuContext from './MenuContext'
import TokenService from './services/token-service';
import AuthApiService from './services/auth-api-service';
import IdleService from './services/idle-service';
//import { LIST, PLAN } from './store.js';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import config from './config';


class App extends React.Component {

  state = {
    menu_items: [],
    menu_plan: [],
    error: null,
    item_counts: []
  }

  setMenuItems = items => {
    console.log(items)
    this.setState({
      menu_items: items,
      error: null
    })
  }

  addMenuItem = item => {
    this.setState({
      menu_items: [...this.state.menu_items, item]
    })
  }

  removeMenuItem = itemId => {
    const updatedMenuItems = this.state.menu_items.filter(itm => 
      itm.id !== itemId
    )
    this.setState({
      menu_items: updatedMenuItems
    })
  }

  updateMenuItem = item => {
    const updatedMenuItems = this.state.menu_items.map(itm => 
      (itm.id === item.id) ?
        item 
          :
        itm
      )
      this.setState({
        menu_items: updatedMenuItems
      })
  }

  addToMenuPlan = item => {
    const { menu_plan } = this.state
    this.setState({
      menu_plan: [...menu_plan, item]
    })    
  }

  removeFromMenuPlan = itemId => {
    const { menu_plan } = this.state
    for(let i=0; i < menu_plan.length; i++){
      if(menu_plan[i].id === itemId){
        menu_plan.splice(i,1)
        this.setState({
          menu_plan: menu_plan
        })
        return
      }
    }
  }

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
    const contextValue = {
      menu_items: this.state.menu_items,
      menu_plan: this.state.menu_plan,
      addMenuItem: this.addMenuItem,
      removeMenuItem: this.removeMenuItem,
      updateMenuItem: this.updateMenuItem,
      addToMenuPlan: this.addToMenuPlan,
      removeFromMenuPlan: this.removeFromMenuPlan,
      setMenuItems: this.setMenuItems,
    }

    return (
       <main className='App'>
         <Nav />
         <MenuContext.Provider value={contextValue}>
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
        </MenuContext.Provider>    
       </main>
    );
  }
}




export default App;



