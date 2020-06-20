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
import { LIST, PLAN } from './store.js';


class App extends React.Component {

  state = {
    menu_items: [],
    menu_plan: [],
    error: null
  }
  
  setMenuItems = items => {
    this.setState({
      menu_items: items,
      error: null
    })
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
    }

    return (
       <main className='App'>
         <Nav />
         <MenuContext.Provider value={contextValue}>
            <Switch>
                <Route exact path='/' component={LandingPage} /> 
                <Route path='/menu' component={MenuListPage}/>
                <Route path='/meal-plan' 
                      render={()=> <MealPlanPage items={ PLAN }/>}
                />
                <Route path='/add-menu-item' component={AddMenuItem} />
                <Route path='/edit-menu-item' component={EditMenuItem} />
                <Route component={NotFoundPage} />
            </Switch>
        </MenuContext.Provider>    
       </main>
    );
  }
}
  

export default App;



