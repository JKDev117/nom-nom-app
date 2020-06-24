import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MenuListPage from './components/MenuListPage';
import MealPlanPage from './components/MealPlanPage';
import AddMenuItem from './components/AddMenuItem';
import EditMenuItem from './components/EditMenuItem';
import NotFoundPage from './components/NotFoundPage';
import Nav from './components/Nav';
import config from './config';
import MenuContext from './MenuContext'
//import { LIST, PLAN } from './store.js';


class App extends React.Component {

  state = {
    menu_items: [],
    menu_plan: [],
    error: null,
    item_counts: []
  }

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

  componentDidMount(){
    const url = config.REACT_APP_API_BASE_URL + '/menu';
    const options = {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
    fetch(url, options)
      .then(res => {
        if(!res.ok){
          return res.json().then(e => Promise.reject(e))
        }
        return res.json()
      })
      .then(this.setMenuItems)
      .catch(error => this.setState({error}))
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
    }

    return (
       <main className='App'>
         <Nav />
         <MenuContext.Provider value={contextValue}>
            <Switch>
                <Route exact path='/' component={LandingPage} /> 
                <Route path='/menu' component={MenuListPage}/>
                <Route path='/meal-plan' component={MealPlanPage}/>
                <Route path='/add-menu-item' component={AddMenuItem} />
                <Route path='/edit-menu-item/:item_id' component={EditMenuItem} />
                <Route component={NotFoundPage} />
            </Switch>
        </MenuContext.Provider>    
       </main>
    );
  }
}




export default App;



