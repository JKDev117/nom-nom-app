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
//import { LIST, PLAN } from '../store/store.js';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import config from './config';


class App extends React.Component {

    state = {
      menu_items: [],
      menu_plan: [],
      menu_plan_count: [],
      error: null,
      //item_counts: []
      //countAdded: '',
    }

    /* menu list methods -------------------------------------------------------- */
    setMenuItems = items => {
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

    /* plan list methods -------------------------------------------------------- */

    setPlanItems = items => {
      /*
      this.setState({
        menu_plan: items,
      })
      */
      /*
      this.setState({
          menu_plan: items.reduce((acc, item) => {
            if (!acc.includes(item)){ 
              acc.push(item)
            } else {
              const id = acc.findIndex(item)
              acc[id].occurrence = acc[id].occurrence + 1 || 2
            }
            return acc
          }, [])
      })
      */
     this.setState({
        menu_plan: items,
        menu_plan_count: items.reduce((acc, item) => {
          const id = acc.findIndex(i => i.menu_item_id === item.menu_item_id)
          if (id === -1){
            acc.push(item)
          } else {
            Object.assign(acc[id], { occurrence: (acc[id].occurrence + 1 || 2) })
          }
          return acc
        }, [])
     })
    }


    addToMenuPlan = item => {
        /*
        const { menu_plan } = this.state
        this.setState({
          menu_plan: [...menu_plan, item]
        })
        */
        const url = config.REACT_APP_API_BASE_URL + '/plan';
        const options = {
          method: 'POST',
          headers: {
            //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
            "Authorization": `Bearer ${TokenService.getAuthToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item)
        }
        fetch(url, options)
          .then(res => {
            if(!res.ok){
              return res.json().then(e => Promise.reject(e))
            }
            //return res.json()
            return res.json()
            })
          .then(resJson => { 
              const newMenuCount = [...this.state.menu_plan_count]
              const id = newMenuCount.findIndex(p => p.menu_item_id === resJson.menu_item_id)
              newMenuCount[id].occurrence++
              this.setState({
                  menu_plan: [...this.state.menu_plan, item],
                  menu_plan_count: newMenuCount,    
                  //menu_plan: [...this.state.menu_plan, item]
                  //menu_plan: [...this.state.menu_plan, resJson] // using resJson rather than item causes 'Added: ' to not work
              })
          })
          .catch(error => console.log(error))//this.setState({error}))
          console.log(this.state.menu_plan_count)
    }
    
    /*
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
    }*/

    removeFromMenuPlan = item => {
      console.log('item @App.js @removeFromMenuPlan', item)

      const body = {
        user_id: item.user_id,
        menu_item_id: item.id || item.menu_item_id,
        name: item.name,
        category: item.category,
        calories: item.calories,
        protein: item.protein,
        carbs: item.carbs,
        fat: item.fat,
        image_url: item.image_url
      }

      console.log('body @App.js @removeFromMenuPlan', body)

      const url = config.REACT_APP_API_BASE_URL + '/plan';
      const options = {
        method: 'DELETE',
        headers: {
          //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
          "Authorization": `Bearer ${TokenService.getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      }
    
      fetch(url, options)
          .then(res => {
            if(!res.ok){
              return res.json().then(e => Promise.reject(e))
            }
            return;
          })
          .catch(error => console.log(error))

          //.then(() => {
            const newMenuCount = [...this.state.menu_plan_count]
            const id = newMenuCount.findIndex(p => p.menu_item_id === item.id || item.menu_item_id)
            if(newMenuCount[id] !== undefined && newMenuCount[id].occurrence > 0){
              newMenuCount[id].occurrence--
            }

            const { menu_plan } = this.state
            for(let i=0; menu_plan[i] !== undefined; i++){
              if(JSON.stringify(menu_plan[i]) === JSON.stringify(item)){
                menu_plan.splice(i,1)
                i--
              }
            }

            this.setState({
              menu_plan: menu_plan,
              menu_plan_count: newMenuCount
            })

            return;
          //})//end .then
          
    }//end removeFromMenuPlan()

    /*
    checkMenuPlan(id, menu_plan){
      let count = 0
      for(let i=0; i < menu_plan.length; i++){
          if(menu_plan[i].id === id){
              count += 1
          }   
      }
      if(count > 0){
        return ` Added: ${count}`
      }
      return ''
    }
    */

  checkMenuPlan = id => {
    /*
    const { menu_plan } = this.state
    let count = 0
    for(let i=0; i < menu_plan.length; i++){
        if(menu_plan[i].menu_item_id === id){
            count += 1
        }   
    }
    if(count > 0){
      return ` Added: ${count}`
    }
    return ''
    */
    const { menu_plan_count } = this.state


    for(let i=0; i < menu_plan_count.length; i++){
      if(menu_plan_count[i].menu_item_id === id){
        return `Added: ${menu_plan_count[i].occurrence}`
      }
    }
    return ''
    
  }

  /* ---------------------------------------------------------------------------------- */

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
    //context
    const contextValue = {
      menu_items: this.state.menu_items,
      menu_plan: this.state.menu_plan,
      addMenuItem: this.addMenuItem,
      removeMenuItem: this.removeMenuItem,
      updateMenuItem: this.updateMenuItem,
      addToMenuPlan: this.addToMenuPlan,
      removeFromMenuPlan: this.removeFromMenuPlan,
      setMenuItems: this.setMenuItems,
      checkMenuPlan: this.checkMenuPlan,
      setPlanItems: this.setPlanItems,
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



