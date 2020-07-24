import React from 'react';
import { Link } from 'react-router-dom';
import './MenuListPage.css';
import { MyContext } from '../../MyProvider';
//import { element } from 'prop-types';
import config from '../../config';
import TokenService from '../../services/token-service';

class MenuListPage extends React.Component {
 
    static contextType = MyContext;
    
    handleRemoveFromMealPlan = item => {
        const { meal_plan, removeFromMealPlan } = this.context;
        let plan_id;
        for(let element of meal_plan){
            if(element.menu_item_id === item.id){
                plan_id = element.id
                break;
            }
        }
        removeFromMealPlan(plan_id)
    }

    handleSubmit = e => {
        //console.log('e', e)
        e.preventDefault()
        let checkedBoxes = document.querySelectorAll('input[name="menu-item"]:checked');
        //console.log(checkedBoxes)
        const ids_of_checked_menu_items = []
        checkedBoxes.forEach(checkbox => {
            ids_of_checked_menu_items.push(checkbox.value)
        })
        //console.log(ids_of_checked_menu_items)
        this.context.addToMealPlan(this.context.user_id, ids_of_checked_menu_items)
        setTimeout(() => this.props.history.push('/meal-plan'), 600)            
    }
        
    componentDidMount(){
        const { checkMealPlanForItem } = this.context;
        console.log('@MenuListPage.js [componentDidMount]')

        //GET /plan
        const plan_url = config.REACT_APP_API_BASE_URL + '/plan';
        const plan_options = {
            method: 'GET',
            headers: {
                //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
                "Authorization": `Bearer ${TokenService.getAuthToken()}`,
                "Content-Type": "application/json",
            }
        }

        //GET /menu
        const menu_url = config.REACT_APP_API_BASE_URL + '/menu';
        const menu_options = {
            method: 'GET',
            headers: {
                //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
                "Authorization": `Bearer ${TokenService.getAuthToken()}`,
                "Content-Type": "application/json",
            }
        }

        //fetch plan_url
        fetch(plan_url, plan_options)
            .then(res => {
                console.log('fetch plan')
                if(!res.ok){
                    return res.json().then(e => Promise.reject(e))
                }
                //console.log('res.json()', res.json())
                return res.json()
            })
            .then(resJson => {
                console.log('this.context.setMealPlan')
                return this.context.setMealPlan(resJson)
            })
            .catch(error => console.log(error))

       
        //fetch menu_url
        fetch(menu_url, menu_options)
          .then(res => {
            console.log('fetch menu')
            if(!res.ok){
              return res.json().then(e => Promise.reject(e))
            }
            return res.json()
          })
          .then(resJson => {
            const menu_items_modified = resJson.map(
                item => {
                    //console.log('item', item)
                    console.log('this.context.meal_plan @"fetch menu"', this.context.meal_plan)
                    if(checkMealPlanForItem(item)===true){
                        Object.assign(item, {in_meal_plan: true})
                    } else {
                        Object.assign(item, {in_meal_plan: false})
                    }
                    return item
                }
            )
            console.log('this.context.setMenuItems')
            return this.context.setMenuItems(menu_items_modified)
          })           
          .catch(error => console.log(error))//this.setState({error}))
    }


    /*
    const button = document.querySelector(`.button${element.menu_item_id}`);
    button.disabled = true;
    */

    render(){
        console.log("@MenuListPage.js render")
        //console.log('addedToMenuPlan @render', this.state.addedToMenuPlan)
        //console.log('menu_items', this.context.menu_items)

        const { menu_items } = this.context
        
        /*
        //to see values of in_meal_plan (boolean) for menu_items for debugging purposes
        const temp =[]
        menu_items.forEach(element => 
            temp.push(element.in_meal_plan)    
        )
        console.log('values of in_meal_plan (boolean) for menu_items', temp)
        */
       

        const categories = [
            {category: 'Breakfast', list: []},
            {category: 'Lunch', list: []},
            {category: 'Dinner', list: []}
        ]

        categories.forEach(
            category => category.list = menu_items.filter(item => item.category === category.category)
                        .map((item, i) =>
                                <li key={i}>
                                    
                                    {item.in_meal_plan ? 
                                        <>
                                            <label className="gray" htmlFor={`menu-item${item.id}`}>{item.name}</label>

                                            <Link to={`/edit-menu-item/${item.id}`}>
                                                <button>Edit</button><br/>
                                            </Link>
                                            
                                            <span className="added-status">[In Today's Meal Plan] </span>
                                            <button type="button" onClick={()=>this.handleRemoveFromMealPlan(item)}>Remove from today's meal plan</button>                                   
                                            
                                            <details className="gray">
                                                <summary>
                                                    (nutritional info)
                                                </summary>
                                                { item.image_url ? 
                                                    <img style={{opacity: '0.5' }} src={item.image_url} alt={`${item.name}`}/> : "" }  
                                                <p className="mealplan-nutritional-info">
                                                    (<u>Calories</u>: {item.calories} 
                                                    <u>Carbs</u>: {item.carbs}g   
                                                    <u>Protein</u>: {item.protein}g
                                                    <u>Fat</u>: {item.fat}g)
                                                </p>
                                            </details>
                                        </>

                                    :
                                        <>
                                            <input className="checkBox" type="checkbox" id={`menu-item${item.id}`} name="menu-item" value={item.id} />
                                            <label htmlFor={`menu-item${item.id}`}>{item.name}</label>
                                            <Link to={`/edit-menu-item/${item.id}`}>
                                                <button>Edit</button><br/>
                                            </Link>
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
                                        </>
                                    }
                        
                                </li>
                        )//end .map
        )
                                                    

        return(
            <div className="MenuListPage">
                <h1>My Nom Nom Menu</h1>
                <Link to='/add-menu-item'>
                    <button>+ Add New Menu Item</button>
                </Link>

                <form onSubmit={this.handleSubmit}>
                    <section className="menuCategory">Breakfast Menu <br/>
                        <ul>
                            {categories[0].list}
                        </ul>
                        
                    </section>
                    <section className="menuCategory">Lunch Menu <br/>
                        <ul>
                            {categories[1].list}
                        </ul>
                        
                    </section>
                    <section className="menuCategory">Dinner Menu <br/>
                        <ul>
                            {categories[2].list}
                        </ul>
                        
                    </section>
                    <input type="submit" />

                </form>
            </div>
        )
    }
}


export default MenuListPage