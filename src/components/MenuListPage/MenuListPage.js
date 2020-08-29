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
        
    nutritionalInfo (e){
        e.target.classList.toggle('active')
            // Toggle between hiding and showing the active panel
            let panel = e.target.nextElementSibling;
              if(panel.style.display === 'block'){
                panel.style.display = 'none';
              } else {
                panel.style.display = 'block';
              }
    }

    expandAll(className){
        let acc = document.getElementsByClassName(className)
        for(let i=0; i<acc.length; i++){
            if(acc[i].classList.contains('active')===false){
                acc[i].classList.add('active')
            }
            let panel = acc[i].nextElementSibling
            if(panel.style.display !== 'block'){
                panel.style.display = 'block';
            }  
        }
    }


    collapseAll(className){
        let acc = document.getElementsByClassName(className)

        for(let i=0; i<acc.length; i++){
            if(acc[i].classList.contains('active')===true){
            acc[i].classList.remove('active')
            }
            let panel = acc[i].nextElementSibling

            if(panel.style.display === 'block'){
                panel.style.display = 'none';
            }  
        }
    }


    componentDidMount(){
        const { checkMealPlanForItem } = this.context;

        //GET /plan
        const plan_url = config.REACT_APP_API_BASE_URL + '/plan';
        const plan_options = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${TokenService.getAuthToken()}`,
                "Content-Type": "application/json",
            }
        }

        //GET /menu
        const menu_url = config.REACT_APP_API_BASE_URL + '/menu';
        const menu_options = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${TokenService.getAuthToken()}`,
                "Content-Type": "application/json",
            }
        }

        //fetch plan_url
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
                //fetch menu_url
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

        categories.forEach(
            category => category.list = menu_items.filter(item => item.category === category.category)
                        .map((item, i) =>
                                <li className="meal-box" key={i}>
                                    
                                    {item.in_meal_plan ? 
                                        <>
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
                                        </>
                                    :
                                        <>
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
                                        </>
                                    }
                                </li>
                        )//end .map
        )



        return(
            <div className="MenuListPage">
                <img className="food-menu" src="/images/food-menu.png" alt="food-menu"/>

                <h1 className="menu-list-title">My Menu List</h1>                   
                <br/>
                <span id="alert"></span>

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