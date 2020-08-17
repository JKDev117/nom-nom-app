import React from 'react';
import { Link } from 'react-router-dom';
import './MenuListPage.css';
import { MyContext } from '../../MyProvider';
//import { element } from 'prop-types';
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

    handleSubmit () {
        let checkedBoxes = document.querySelectorAll('input[name="menu-item"]:checked');
        //console.log(checkedBoxes)
        const ids_of_checked_menu_items = []
        checkedBoxes.forEach(checkbox => {
            ids_of_checked_menu_items.push(checkbox.value)
        })
        //console.log(ids_of_checked_menu_items)
        this.context.addToMealPlan(this.context.user_id, ids_of_checked_menu_items, () => this.props.history.push('/meal-plan'))
        //setTimeout(() => this.props.history.push('/meal-plan'), 600)            
    }
        
    nutritionalInfo (e){
        //console.log(e)
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
        console.log('acc', acc)
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
            //.catch(error => console.log(error))
            .then(
                //fetch menu_url
                () => fetch(menu_url, menu_options)
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
                //.catch(error => console.log(error))//this.setState({error}))
            )
            .catch(error =>  console.log(error))

            
    }




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
                                <li className="meal-box" key={i}>
                                    
                                    {item.in_meal_plan ? 
                                        <>  
                                            <span className="added-status">ADDED</span><br/>
                                            <label className="gray" htmlFor={`menu-item${item.id}`}>{item.name}</label>
                                            <Link className="edit-button-link" to={`/edit-menu-item/${item.id}`}>
                                                <button>Edit</button><br />
                                            </Link>
                                            { item.image_url ? <img src={item.image_url} alt={`${item.name}`}/> : "" }
    
                                            <div className="menu-item-info"> 

                                                {/*<button className={`accordion ${item.category}`} type="button" onClick={e => this.nutritionalInfo(e)}> (see nutritional info)</button>*/}
                                                <div className="panel">
                                                    
                                                        <p className="mealplan-nutritional-info">
                                                            <u>Calories</u>: {item.calories} 
                                                            <u>Carbs</u>: {item.carbs}g  
                                                            <u>Protein</u>: {item.protein}g
                                                            <u>Fat</u>: {item.fat}g
                                                        </p>
                                                </div><br />
                                            </div>
                                            <button type="button" onClick={()=>this.handleRemoveFromMealPlan(item)}>Remove from today's meal plan</button>                             
                                            
                                            {/* <details className="gray">
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
                                            </details> */}
                                        </>

                                    :
                                        <>
                                            <input className="checkBox" type="checkbox" id={`menu-item${item.id}`} name="menu-item" value={item.id} required />
                                            <label htmlFor={`menu-item${item.id}`}>{item.name}</label>
                                            <Link className="edit-button-link" to={`/edit-menu-item/${item.id}`}>
                                                <button >Edit</button><br/>
                                            </Link>

                                            <button className={`accordion ${item.category}`} type="button" onClick={e => this.nutritionalInfo(e)}>(nutritional info)</button>
                                            <div className="panel">
                                                { item.image_url ? 
                                                        <img src={item.image_url} alt={`${item.name}`}/> : "" }  
                                                    <p className="mealplan-nutritional-info">
                                                        (<u>Calories</u>: {item.calories} 
                                                        <u>Carbs</u>: {item.carbs}g   
                                                        <u>Protein</u>: {item.protein}g
                                                        <u>Fat</u>: {item.fat}g)
                                                    </p>
                                            </div>
                                            {/*
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
                                            */}
                                        </>
                                    }
                                </li>
                        )//end .map
        )



        return(
            <div className="MenuListPage">
                <img src="https://image.flaticon.com/icons/png/512/289/289658.png" alt="food-menu"/>

                <h1 className="menu-list-title">My Menu List</h1>
                     
                {/*<input type="button" id="addToMealPlanButton" onClick={() => {
                        const checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked')

                        if(!checkedBoxes.length){
                            document.querySelector('#alert').innerHTML = "You must select atleast one new menu item option to submit."
                            return;
                        }

                        this.handleSubmit()
                }} value="Add Selected Items To Today's Meal Plan"/> */}
                <button id="addToMealPlanButton" onClick={() => {
                        const checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked')

                        if(!checkedBoxes.length){
                            document.querySelector('#alert').innerHTML = "You must select atleast one new menu item option to submit."
                            return;
                        }

                        this.handleSubmit()
                }}>Add Selected Items To Today's Meal Plan</button>                    
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
                            <h2 className="breakfastLabel breakfastLabelColor">Breakfast Menu</h2>
                            <div className="category-buttons">
                                    <Link to='/add-menu-item'>
                                        <button className='add-new-menu-item-button'>+ Add New Menu Item</button>
                                    </Link>
                                        <div className='expand-collapse-buttons'>
                                            <button className="expand-all" onClick={()=>this.expandAll('Breakfast')}>Expand All</button>
                                            <button className="collapse-all" onClick={()=>this.collapseAll('Breakfast')}>Collapse All</button>
                                        </div>
                            </div>
                            <section className="menuCategory">
                                <ul className="parent-ul">
                                    {categories[0].list}
                                </ul>
                            </section>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div id="lunch-menu">
                            <h2 className="lunchLabel lunchLabelColor">Lunch Menu</h2>
                            <section className="menuCategory">
                                <ul>
                                    <button className="expand-all" onClick={()=>this.expandAll('Lunch')}>Expand All</button>
                                    <button className="collapse-all" onClick={()=>this.collapseAll('Lunch')}>Collapse All</button>
                                    {categories[1].list}
                                </ul>
                                
                            </section>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div id="dinner-menu">
                            <h2 className="dinnerLabel dinnerLabelColor">Dinner Menu</h2>
                            <section className="menuCategory">
                                <ul>
                                    <button className="expand-all" onClick={()=>this.expandAll('Dinner')}>Expand All</button>
                                    <button className="collapse-all" onClick={()=>this.collapseAll('Dinner')}>Collapse All</button>
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


export default MenuListPage