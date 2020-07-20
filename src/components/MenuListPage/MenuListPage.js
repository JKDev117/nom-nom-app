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
    
    state = {
        addedToMenuPlan: [],
    }

    addToMenuPlan = (user_id, checked_menu_item_ids) => {
        console.log(user_id)
        console.log(checked_menu_item_ids)
        for(let i=0; i<checked_menu_item_ids.length; i++){
          const body = {
            user_id: user_id,
            id: checked_menu_item_ids[i]
          }
          const url = config.REACT_APP_API_BASE_URL + '/plan';
          const options = {
            method: 'POST',
            headers: {
              //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
              "Authorization": `Bearer ${TokenService.getAuthToken()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
          }
          fetch(url, options)
          .then(res => {
            if(!res.ok){
              return res.json().then(e => Promise.reject(e))
            }
            //return res.json()
            return res.json()
            })
          .then(resJson => {
            
          })            
          /* MS Code
          .then(resJson => { 
            const newMenuCount = [...this.state.menu_plan_count]
            const id = newMenuCount.findIndex(p => p.menu_item_id === resJson.menu_item_id)
            newMenuCount[id].occurrence++
            this.setState({
                menu_plan: [...this.state.menu_plan, item],
                menu_plan_count: newMenuCount,    
                //menu_plan: [...this.state.menu_plan, item]
                //menu_plan: [...this.state.menu_plan, resJson] // using resJson rather than item causes 'Added: ' to not work
            })
          })*/

          .catch(error => console.log(error))//this.setState({error}))
          //console.log(this.state.menu_plan_count)
        
        }//end for loop
    }//addToMenuPlan()


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

          /*
          //GET /plan
          const url2 = config.REACT_APP_API_BASE_URL + '/plan';
          const options2 = {
            method: 'GET',
            headers: {
              //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
              "Authorization": `Bearer ${TokenService.getAuthToken()}`,
              "Content-Type": "application/json",
            }
          }
          fetch(url2, options2)
            .then(res => {
              if(!res.ok){
                return res.json().then(e => Promise.reject(e))
              }
              return res.json()
            })
            .then(this.context.setPlanItems)
            .catch(error => console.log(error))
            */
    }

    /*
    const button = document.querySelector(`.button${element.menu_item_id}`);
    button.disabled = true;
    */


    render(){
        console.log('addedToMenuPlan @render', this.state.addedToMenuPlan)
        //console.log('menu_items', this.context.menu_items)
        const { user_id, menu_items, addToMenuPlan, removeFromMenuPlan, menu_plan, checkMenuPlan  } = this.context

        const breakfasts 
            = menu_items.filter(item => item.category === 'Breakfast')
                        .map((item, i) =>
                                <li key={i}>
                                    <input className="checkBox" type="checkbox" id={`menu-item${item.id}`} name="menu-item" value={item.id}/>
                                    <label htmlFor={`menu-item${item.id}`}>{item.name}</label>
                                    <Link to={`/edit-menu-item/${item.id}`}>
                                        <button>Edit Meal Item</button><br/>
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
                        console.log(checkedBoxes)
                        const checked_menu_item_ids = []
                        checkedBoxes.forEach(checkbox => {
                            checked_menu_item_ids.push(checkbox.value)
                        })
                        console.log(checked_menu_item_ids)
                        this.addToMenuPlan(user_id, checked_menu_item_ids)
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