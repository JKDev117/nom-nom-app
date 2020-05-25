import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MenuListPage from './components/MenuListPage';
import MealPlanPage from './components/MealPlanPage';
import AddMenuItem from './components/AddMenuItem';
import EditMenuItem from './components/EditMenuItem';
import NotFoundPage from './components/NotFoundPage';

function App(props) {
  console.log(props)
  return (
     <main className='App'>
       {"Hello world!"}
       <Switch>
          <Route exact path='/' component={LandingPage} /> 
          <Route path='/menu' 
                 render={()=> <MenuListPage items={props.store}/>}
          />
          <Route path='/meal-plan' component={MealPlanPage} />
          <Route path='/add-menu-item' component={AddMenuItem} />
          <Route path='/edit-menu-item' component={EditMenuItem} />
          <Route component={NotFoundPage} />
       </Switch>  

     </main>
  );
}

export default App;



