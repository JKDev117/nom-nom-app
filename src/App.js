import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MenuListPage from './components/MenuListPage';
import MealPlanPage from './components/MealPlanPage';
import AddMenuItem from './components/AddMenuItem';
import EditMenuItem from './components/EditMenuItem';
import NotFoundPage from './components/NotFoundPage';
import { LIST, PLAN } from './store.js'

class App extends React.Component {
  
  render(){
    console.log(LIST[0].url)
    return (
       <main className='App'>
         <Switch>
            <Route exact path='/' component={LandingPage} /> 
            <Route path='/menu' 
                   render={()=> <MenuListPage items={ LIST }/>}
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



