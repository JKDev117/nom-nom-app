import React from 'react';
import { Link } from 'react-router-dom';
import './MealPlanPage.css';
import MenuContext from '../../MenuContext';
import config from '../../config';
import TokenService from '../../services/token-service';


class MealPlanPage extends React.Component {
    static contextType = MenuContext;

    state = {
        menu_plan: []
    }

    setPlanItems = items => {
        this.setState({
           menu_plan: items,
           
           /* MS Code
           menu_plan_count: items.reduce((acc, item) => {
             const id = acc.findIndex(i => i.menu_item_id === item.menu_item_id)
             if (id === -1){
               acc.push(item)
             } else {
               Object.assign(acc[id], { occurrence: (acc[id].occurrence + 1 || 2) })
             }
             return acc
           }, [])
           */
        })
    }

    componentDidMount(){
        //GET /plan
        const url = config.REACT_APP_API_BASE_URL + '/plan';
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
          .then(this.setPlanItems)
          .catch(error => console.log(error))
    }


    render(){
        //const { menu_plan, removeFromMenuPlan } = this.context
        const {menu_plan} = this.state

        //to calculate total
        let calories = 0;
        let carbs = 0;
        let protein = 0;
        let fat = 0;
        menu_plan.forEach(item => {
            calories += item.calories;
            carbs += item.carbs;
            protein += item.protein;
            fat += item.fat;
        })
        
        const breakfasts = menu_plan.filter(item => item.category === 'Breakfast')
                                           .map((item, i) => 
                                                    <li key={i}>
                                                        <span>{item.name}</span> <br/>
                                                        {item.image_url ? 
                                                            <img src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" }
                                                        <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g  <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        <button onClick={()=>{/*removeFromMenuPlan(item)*/}}>Remove from Today's Meal Plan</button>
                                                    </li>)
        
        const lunches = menu_plan.filter(item => item.category === 'Lunch')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <span>{item.name}</span> <br/>
                                                        {item.image_url ? 
                                                            <img src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" }
                                                        <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g  <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        <button onClick={()=>{/*removeFromMenuPlan(item)*/}}>Remove from Today's Meal Plan</button>
                                                    </li>)
        
        const dinners = menu_plan.filter(item => item.category === 'Dinner')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <span>{item.name}</span> <br/>
                                                        {item.image_url ? 
                                                            <img src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" }
                                                        <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g  <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        <button onClick={()=>{/*removeFromMenuPlan(item)*/}}>Remove from Today's Meal Plan</button>
                                                    </li>)                                                  

        return(
            <div className="MenuListPage">
                <h1>Today's Meal Plan</h1>
                {/*<p className="user-note"><u>Note</u>: The Meal Plan is currently on-device only and will not work across multiple devices. Multi-device support coming soon!</p>*/}
                <section className="menuCategory">Breakfast <br/>
                    <ul>
                        {breakfasts}
                    </ul>
                </section>
                <section className="menuCategory">Lunch <br/>
                    <ul>
                        {lunches}
                    </ul>    
                </section>
                <section className="menuCategory">Dinner <br/>
                    <ul>
                        {dinners}
                    </ul>
                </section>
                <section>Total
                    <p><u>Calories</u>: {calories} <u>Carbs</u>: {carbs} g <u>Protein</u>: {protein} g <u>Fat</u>: {fat} g</p>
                </section>
            </div>
        )
    }
}

export default MealPlanPage