import React from 'react';
import LandingPage from './components/LandingPage';
import MenuListPage from './components/MenuListPage';
import MealPlanPage from './components/MealPlanPage';
import AddMenuItem from './components/AddMenuItem';
import EditMenuItem from './components/EditMenuItem';


function App(props) {
  return (
     <main className='App'>
       {"Hello world!"}
       <LandingPage /> 
       <MenuListPage />
       <MealPlanPage />
       <AddMenuItem />
       <EditMenuItem />
     </main>
  );
}

export default App;



