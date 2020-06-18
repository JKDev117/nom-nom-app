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
import { LIST, PLAN } from './store.js';


class App extends React.Component {

  state = {
    menu_items: [],
    menu_plan: []
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
      .then(data => {
        this.setState({
          menu_items: data
        })
      })
      .catch(error => console.error({error}))
  }



  render(){
    return (
       <main className='App'>
         <Nav />
         <Switch>
            <Route exact path='/' component={LandingPage} /> 
            <Route path='/menu' 
                   render={()=> <MenuListPage items={this.state.menu_items}/>}
            />
            <Route path='/meal-plan' 
                   render={()=> <MealPlanPage items={ PLAN }/>}
            />
            <Route path='/add-menu-item' component={AddMenuItem} />
            <Route path='/edit-menu-item' component={EditMenuItem} />
            <Route component={NotFoundPage} />
         </Switch>  
  
       </main>
    );
  }
}
  

export default App;



