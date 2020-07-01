import React from 'react';
import { Link } from 'react-router-dom';
import './MenuListPage.css';
import MenuContext from '../../MenuContext';
//import { element } from 'prop-types';
import config from '../../config';
import TokenService from '../../services/token-service';

class MenuListPage extends React.Component {

 
    static defaultProps = {
        menu_items: []
    }

    static contextType = MenuContext;

    checkMenuPlan(id, menu_plan){
        let count = 0
        for(let i=0; i < menu_plan.length; i++){
            if(menu_plan[i].id === id){
                count += 1
            }   
        }
        return count
    }
   


  componentDidMount(){
    const url = config.REACT_APP_API_BASE_URL + '/menu';
    const options = {
      method: 'GET',
      headers: {
        //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
        "Authorization": `Bearer ${TokenService.getAuthToken()}`,
        "Content-Type": "application/json",
      }
    }
    fetch(url, options)
      .then(res => {
        if(!res.ok){
          return res.json().then(e => Promise.reject(e))
        }
        return res.json()
      })
      .then(this.context.setMenuItems)
      .catch(error => console.log(error))//this.setState({error}))
  }

    render(){
        const { menu_items, addToMenuPlan, removeFromMenuPlan, menu_plan  } = this.context
        const breakfasts = menu_items.filter(item => item.category === 'Breakfast')
                                           .map((item, i) => 
                                                    <li key={i}>
                                                        <details>
                                                            <summary>{item.name}
                                                                <span id='added-status'>
                                                                    {this.checkMenuPlan(item.id, menu_plan) > 0 ? 
                                                                        `Added: ${this.checkMenuPlan(item.id, menu_plan)}` 
                                                                            : 
                                                                        ''}
                                                                </span>
                                                            </summary>        
                                                            {item.image_url ? 
                                                            <img src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" }
                                                            <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g   <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        </details>

                                                        <button onClick={() => addToMenuPlan(item)}>Add to Today's Meal Plan</button>
                                                        <button onClick={() => removeFromMenuPlan(item.id)}>Remove from Today's Meal Plan</button>
                                                        <Link to={`/edit-menu-item/${item.id}`}>
                                                            <button>Edit Meal Item</button>
                                                        </Link>    
                                                    </li>)
        
        const lunches = menu_items.filter(item => item.category === 'Lunch')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <details>
                                                            <summary>{item.name} 
                                                                <span id='added-status'>{
                                                                    this.checkMenuPlan(item.id, menu_plan) > 0 ? 
                                                                        `Added: ${this.checkMenuPlan(item.id, menu_plan)}` 
                                                                            : 
                                                                        ''}
                                                                </span>
                                                            </summary>
                                                            {item.image_url ? 
                                                            <img src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" }
                                                            <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g   <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        </details>
                                                        <button onClick={() => addToMenuPlan(item)}>Add to Today's Meal Plan</button>
                                                        <button onClick={()=>removeFromMenuPlan(item.id)}>Remove from Today's Meal Plan</button>
                                                        <Link to={`/edit-menu-item/${item.id}`}>
                                                            <button>Edit Meal Item</button>
                                                        </Link> 

                                                    </li>)
        
        const dinners = menu_items.filter(item => item.category === 'Dinner')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <details>
                                                            <summary>{item.name} 
                                                                <span id='added-status'>
                                                                    {this.checkMenuPlan(item.id, menu_plan) > 0 ? 
                                                                        `Added: ${this.checkMenuPlan(item.id, menu_plan)}` 
                                                                            :
                                                                        ''}
                                                                </span>
                                                            </summary>
                                                            {item.image_url ? 
                                                            <img src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" }
                                                            <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g   <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        </details>
                                                        <button onClick={() => addToMenuPlan(item)}>Add to Today's Meal Plan</button>
                                                        <button onClick={()=>removeFromMenuPlan(item.id)}>Remove from Today's Meal Plan</button>
                                                        <Link to={`/edit-menu-item/${item.id}`}>
                                                            <button>Edit Meal Item</button>
                                                        </Link> 

                                                    </li>)                                                   

        return(
            <div className="MenuListPage">
                <h1>My Nom Nom Menu</h1>
                <section className="menuCategory">Breakfast Menu <br/>
                    <ul>
                        {breakfasts}
                    </ul>
                    <Link to='/add-menu-item'>
                        <button>+ Add New Menu Item</button>
                    </Link>
                </section>
                <section className="menuCategory">Lunch Menu <br/>
                    <ul>
                        {lunches}
                    </ul>
                    <Link to='/add-menu-item'>
                        <button>+ Add New Menu Item</button>
                    </Link>
                </section>
                <section className="menuCategory">Dinner Menu <br/>
                    <ul>
                        {dinners}
                    </ul>
                    <Link to='/add-menu-item'>
                        <button>+ Add New Menu Item</button>
                    </Link>
                </section>
            </div>
        )
    }
}


export default MenuListPage