import React from 'react';
import { Link } from 'react-router-dom';
import './MenuListPage.css';
import { MyContext } from '../../MyProvider';
//import { element } from 'prop-types';
import config from '../../config';
import TokenService from '../../services/token-service';

class MenuListPage extends React.Component {
 
    static contextType = MyContext;
    
    /*
    componentDidMount(){
        //GET /menu
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
    */

    /*
    const button = document.querySelector(`.button${element.menu_item_id}`);
    button.disabled = true;
    */

    render(){
        console.log("MenuListPage.js")
        //console.log('addedToMenuPlan @render', this.state.addedToMenuPlan)
        //console.log('menu_items', this.context.menu_items)

        const { user_id, menu_items, checkMealPlanForItem } = this.context
        
        
        const menu_items_updated = menu_items.map(
            item => {
                //console.log('item', item)
                if(checkMealPlanForItem(item)===true){
                    Object.assign(item, {in_meal_plan: true})
                } else {
                    Object.assign(item, {in_meal_plan: false})
                }
                return item
            }
        )

        const temp =[]
        menu_items_updated.forEach(element => 
            temp.push(element.in_meal_plan)    
        )
        console.log('menu_items_updated in_meal_plan values', temp)

        const breakfasts 
            = menu_items.filter(item => item.category === 'Breakfast')
                        .map((item, i) =>
                                <li key={i}>
                                    
                                    <input className="checkBox" type="checkbox" id={`menu-item${item.id}`} name="menu-item" value={item.id}/>
                                    <label htmlFor={`menu-item${item.id}`}>{item.name}</label>

                                    <Link to={`/edit-menu-item/${item.id}`}>
                                        <button>Edit Meal Item</button><br/>
                                    </Link>

                                    {/* ----- Added: x ------- */}
                                    
                                    <details>
                                        <summary>
                                            (nutritional info)
                                        </summary>
                                        { item.image_url ? 
                                            <img src={item.image_url} alt={`${item.name}`}/> : "" }  
                                        <p className="mealplan-nutritional-info">
                                            (<u>Calories</u>: {item.calories} 
                                            <u>Carbs</u>: {item.carbs}g   
                                            <u>Protein</u>: {item.protein}g
                                            <u>Fat</u>: {item.fat}g)
                                        </p>
                                    </details>
                                </li>
                        )
        
        const lunches = menu_items.filter(item => item.category === 'Lunch')
                        .map((item, i) =>
                                <li key={i}>
                                    <input className="checkBox" type="checkbox" id={`menu-item${item.id}`} name="menu-item" value={item.id} />
                                    <label htmlFor={`menu-item${item.id}`}>{item.name}</label>
                                    <Link to={`/edit-menu-item/${item.id}`}>
                                        <button>Edit Meal Item</button><br/>
                                    </Link>
                                    {/* ----- Added: x ------- */}
                                    <details>
                                        <summary>
                                            (nutritional info)
                                        </summary>
                                        { item.image_url ? 
                                            <img src={item.image_url} alt={`${item.name}`}/> : "" }  
                                        <p className="mealplan-nutritional-info">
                                            (<u>Calories</u>: {item.calories} 
                                            <u>Carbs</u>: {item.carbs}g   
                                            <u>Protein</u>: {item.protein}g
                                            <u>Fat</u>: {item.fat}g)
                                        </p>
                                    </details>
                                </li>
                        )
        
        const dinners = menu_items.filter(item => item.category === 'Dinner')
                        .map((item, i) =>
                                <li key={i}>
                                    <input className="checkBox" type="checkbox" id={`menu-item${item.id}`} name="menu-item" value={item.id}/>
                                    <label htmlFor={`menu-item${item.id}`}>{item.name}</label>
                                    <Link to={`/edit-menu-item/${item.id}`}>
                                        <button>Edit Meal Item</button><br/>
                                    </Link>
                                    {/* ----- Added: x ------- */}
                                    <details>
                                        <summary>
                                            (nutritional info)
                                        </summary>
                                        { item.image_url ? 
                                            <img src={item.image_url} alt={`${item.name}`}/> : "" }  
                                        <p className="mealplan-nutritional-info">
                                            (<u>Calories</u>: {item.calories} 
                                            <u>Carbs</u>: {item.carbs}g   
                                            <u>Protein</u>: {item.protein}g
                                            <u>Fat</u>: {item.fat}g)
                                        </p>
                                    </details>
                                </li>
                        )                                                 

        return(
            <div className="MenuListPage">
                <h1>My Nom Nom Menu</h1>
                <Link to='/add-menu-item'>
                    <button>+ Add New Menu Item</button>
                </Link>

                <form onSubmit={e => {
                        e.preventDefault()
                        let checkedBoxes = document.querySelectorAll('input[name="menu-item"]:checked');
                        //console.log(checkedBoxes)
                        const ids_of_checked_menu_items = []
                        checkedBoxes.forEach(checkbox => {
                            ids_of_checked_menu_items.push(checkbox.value)
                        })
                        //console.log(ids_of_checked_menu_items)
                        this.context.addToMealPlan(user_id, ids_of_checked_menu_items)
                        this.props.history.push('/meal-plan')
                    }}>
                    <section className="menuCategory">Breakfast Menu <br/>
                        <ul>
                            {breakfasts}
                        </ul>
                        
                    </section>
                    <section className="menuCategory">Lunch Menu <br/>
                        <ul>
                            {lunches}
                        </ul>
                        
                    </section>
                    <section className="menuCategory">Dinner Menu <br/>
                        <ul>
                            {dinners}
                        </ul>
                        
                    </section>
                    <input type="submit" />

                </form>
            </div>
        )
    }
}


export default MenuListPage