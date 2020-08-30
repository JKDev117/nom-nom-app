import React from 'react';
import { Link } from 'react-router-dom';
import './MenuListPage.css';
import { MyContext } from '../../MyProvider';
import config from '../../config';  
import TokenService from '../../services/token-service';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


class MenuListPage extends React.Component {
    
    static contextType = MyContext;
    
    //to remove the menu item from the meal plan
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


    componentDidMount(){
        const { checkMealPlanForItem } = this.context;

        //store endpoint url & options in variables for GET /plan
        const plan_url = config.REACT_APP_API_BASE_URL + '/plan';
        const plan_options = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${TokenService.getAuthToken()}`,
                "Content-Type": "application/json",
            }
        }

        //store endpoint url & options in variables for GET /menu
        const menu_url = config.REACT_APP_API_BASE_URL + '/menu';
        const menu_options = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${TokenService.getAuthToken()}`,
                "Content-Type": "application/json",
            }
        }

        //GET /plan
        fetch(plan_url, plan_options)
            .then(res => {
                if(!res.ok){
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json()
            })
            .then(resJson => {
                return this.context.setMealPlan(resJson)
            })
            .then(
                //GET /menu
                () => fetch(menu_url, menu_options)
                .then(res => {
                    if(!res.ok){
                    return res.json().then(e => Promise.reject(e))
                    }
                    return res.json()
                })
                .then(resJson => {
                    const menu_items_modified = resJson.map(
                        item => {
                            if(checkMealPlanForItem(item)===true){
                                Object.assign(item, {in_meal_plan: true})
                            } else {
                                Object.assign(item, {in_meal_plan: false})
                            }
                            return item
                        }
                    )
                    return this.context.setMenuItems(menu_items_modified)
                })           
            )
            .catch(error =>  console.log(error))    
    }

    render(){
        const { menu_items } = this.context

        const categories = [
            {category: 'Breakfast', list: []},
            {category: 'Lunch', list: []},
            {category: 'Dinner', list: []}
        ]

        /* store into each object in the array 'categories' all the items in the menu
        according to their category along with their html elements; the html format of each menu item will differ depending
        on whether the item is also included in the meal plan or if it's not */
        categories.forEach(
            category => category.list = menu_items.filter(item => item.category === category.category)
                        .map((item, i) =>
                                    item.in_meal_plan ? 
                                        <li className="meal-box meal-box-added" key={i}>
                                            <span className="added-status">ADDED</span><br/>
                                            <label className="gray" htmlFor={`menu-item${item.id}`}>{item.name}</label>
                                            <Link className="edit-button-link" to={`/edit-menu-item/${item.id}`}>
                                                <button className="edit-button">Edit</button><br />
                                            </Link>
                                            { item.image_url ? <img className="menu-item-image gray" src={item.image_url} alt={`${item.name}`}/> : "" }
                                            <div className="menu-item-info"> 
                                                <div className="panel gray">                                    
                                                        <p className="mealplan-nutritional-info">
                                                            <u>Calories</u>: {item.calories} &nbsp; <br/>
                                                            <u>Carbs</u>: {item.carbs}g &nbsp; 
                                                            <u>Protein</u>: {item.protein}g &nbsp;
                                                            <u>Fat</u>: {item.fat}g &nbsp;
                                                        </p>
                                                </div><br />
                                            </div>
                                            <button className="removeFromMP-button" type="button" onClick={()=>this.handleRemoveFromMealPlan(item)}>Remove from today's meal plan</button>                             
                                        </li>
                                    :
                                        <li className="meal-box meal-box-not-added" key={i}>
                                            <label htmlFor={`menu-item${item.id}`}>{item.name}</label>
                                            <Link className="edit-button-link" to={`/edit-menu-item/${item.id}`}>
                                                <button className="edit-button">Edit</button><br/>
                                            </Link>
                                            <div className="panel">
                                                { item.image_url ? 
                                                        <img className="menu-item-image" src={item.image_url} alt={`${item.name}`}/> : "" }  
                                                    <p className="mealplan-nutritional-info">
                                                        <u>Calories</u>: {item.calories} &nbsp;  <br/>
                                                        <u>Carbs</u>: {item.carbs}g &nbsp;   
                                                        <u>Protein</u>: {item.protein}g &nbsp;
                                                        <u>Fat</u>: {item.fat}g &nbsp;
                                                    </p>
                                            </div>
                                            <button className="addToMP-button" type="button" onClick={() => this.context.addToMealPlan(item.user_id, item.id)}>Add to today's meal plan</button>                             
                                        </li>
                        )//end .map
        )

        return(
            <div className="MenuListPage">
                <img className="food-menu" src="/images/food-menu.png" alt="food-menu"/>

                <h1 className="menu-list-title">My Menu List</h1><br/>

                <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
                    <TabList>
                        <Tab>Breakfast Menu</Tab>
                        <Tab>Lunch Menu</Tab>
                        <Tab>Dinner Menu</Tab>
                    </TabList>
                    <TabPanel>
                        <div id="breakfast-menu">
                            <h2 className="breakfastLabel">Breakfast Menu</h2>
                            <Link to='/add-menu-item'>
                                <button className='add-new-menu-item-button'>+ Add New Menu Item</button>
                            </Link>
                            <section className="menuCategory breakfast-menuCategory">
                                <ul>
                                    {categories[0].list}
                                </ul>
                            </section>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div id="lunch-menu">
                            <h2 className="lunchLabel">Lunch Menu</h2>
                            <Link to='/add-menu-item'>
                                <button className='add-new-menu-item-button'>+ Add New Menu Item</button>
                            </Link>
                            <section className="menuCategory lunch-menuCategory">
                                <ul>
                                    {categories[1].list}
                                </ul>
                            </section>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div id="dinner-menu">
                            <h2 className="dinnerLabel">Dinner Menu</h2>
                            <Link to='/add-menu-item'>
                                <button className='add-new-menu-item-button'>+ Add New Menu Item</button>
                            </Link>
                            <section className="menuCategory dinner-menuCategory">
                                <ul>
                                    {categories[2].list}
                                </ul>                 
                            </section>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}


export default MenuListPage;