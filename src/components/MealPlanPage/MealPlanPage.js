import React from 'react';
import { Link } from 'react-router-dom';
import './MealPlanPage.css';
import { MyContext } from '../../MyProvider';
import config from '../../config';
import TokenService from '../../services/token-service';


class MealPlanPage extends React.Component {
    static contextType = MyContext;
    
    /*
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
            //console.log('res.json()', res.json())
            return res.json()
          })
          .then(this.context.setMealPlan)
          .catch(error => console.log(error))
    }
    */
    

    render(){
        console.log("MealPlanPage.js")
        //const { menu_plan, removeFromMealPlan } = this.context
        const { meal_plan, removeFromMealPlan } = this.context

        //to calculate total
        let calories = 0;
        let carbs = 0;
        let protein = 0;
        let fat = 0;
        meal_plan.forEach(item => {
            calories += item.calories;
            carbs += item.carbs;
            protein += item.protein;
            fat += item.fat;
        })
        
        const breakfasts = meal_plan.filter(item => item.category === 'Breakfast')
                                           .map((item, i) => 
                                                    <li key={i}>
                                                        <span>{item.name}</span> <br/>
                                                        {item.image_url ? 
                                                            <img src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" }
                                                        <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g  <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        <button onClick={()=>removeFromMealPlan(item)}>Remove from Today's Meal Plan</button>
                                                    </li>)
        
        const lunches = meal_plan.filter(item => item.category === 'Lunch')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <span>{item.name}</span> <br/>
                                                        {item.image_url ? 
                                                            <img src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" }
                                                        <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g  <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        <button onClick={()=>removeFromMealPlan(item)}>Remove from Today's Meal Plan</button>
                                                    </li>)
        
        const dinners = meal_plan.filter(item => item.category === 'Dinner')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <span>{item.name}</span> <br/>
                                                        {item.image_url ? 
                                                            <img src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" }
                                                        <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g  <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        <button onClick={()=>removeFromMealPlan(item)}>Remove from Today's Meal Plan</button>
                                                    </li>)                                                  

        return (
            <div className="MealPlanPage">
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