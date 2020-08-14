import React from 'react';
import { Link } from 'react-router-dom';
import './MealPlanPage.css';
import { MyContext } from '../../MyProvider';
import config from '../../config';
import TokenService from '../../services/token-service';


class MealPlanPage extends React.Component {
    static contextType = MyContext;
    
    componentDidMount(){
        console.log('@MealPlanPage.js [componentDidMount]')
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

    render(){
        console.log("@MealPlanPage.js render")
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
                                                        <span className="mealplan-item-name">{item.name}</span> <br/>
                                                        {item.image_url ? 
                                                            <img src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" }
                                                        <p className="mealplan-nutritional-info">          
                                                            <u>Calories</u>: {item.calories} <br/>
                                                            <u>Carbs</u>: {item.carbs}g  <br/>
                                                            <u>Protein</u>: {item.protein}g <br/>
                                                            <u>Fat</u>: {item.fat}g<br/>
                                                        </p>
                                                        <button onClick={()=>removeFromMealPlan(item.id)}>Remove from Today's Meal Plan</button>
                                                    </li>)
        
        const lunches = meal_plan.filter(item => item.category === 'Lunch')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <span className="mealplan-item-name">{item.name}</span> <br/>
                                                        {item.image_url ? 
                                                            <img src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" 
                                                        }
                                                        <p className="mealplan-nutritional-info">
                                                            
                                                                <u>Calories</u>: {item.calories} <br/>
                                                                <u>Carbs</u>: {item.carbs}g  <br/>
                                                                <u>Protein</u>: {item.protein}g <br/>
                                                                <u>Fat</u>: {item.fat}g<br/>
                                                            
                                                        </p>
                                                        <button onClick={()=>removeFromMealPlan(item.id)}>Remove from Today's Meal Plan</button>
                                                    </li>)
        
        const dinners = meal_plan.filter(item => item.category === 'Dinner')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <span className="mealplan-item-name">{item.name}</span> <br/>
                                                        {item.image_url ? 
                                                            <img src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" }
                                                        <p className="mealplan-nutritional-info">        
                                                                <u>Calories</u>: {item.calories} <br/>
                                                                <u>Carbs</u>: {item.carbs}g  <br/>
                                                                <u>Protein</u>: {item.protein}g <br/>
                                                                <u>Fat</u>: {item.fat}g<br/>
                                                        </p>
                                                        <button onClick={()=>removeFromMealPlan(item.id)}>Remove from Today's Meal Plan</button>
                                                    </li>)                                                  

        return (
            <div className="MealPlanPage">
                <h1 className="meal-plan-title">Today's Meal Plan</h1>
                {/*<p className="user-note"><u>Note</u>: The Meal Plan is currently on-device only and will not work across multiple devices. Multi-device support coming soon!</p>*/}
                <section className="meal-plan-summary">
                    <p>
                        <u>Calories</u>: {calories}<br/> 
                        <u>Carbs</u>: {carbs} g<br/> 
                        <u>Protein</u>: {protein} g<br/> 
                        <u>Fat</u>: {fat} g<br/>
                    </p>
                </section>
                
                <section className="menuCategory breakfastPlanSection">
                    <h2 className="breakfastLabel">Breakfast</h2>
                    <ul>
                        {breakfasts}
                    </ul>
                </section>
                <section className="menuCategory lunchPlanSection">
                    <h2 className="lunchLabel">Lunch</h2>
                    <ul>
                        {lunches}
                    </ul>    
                </section>
                <section className="menuCategory dinnerPlanSection">
                    <h2 className="dinnerLabel">Dinner</h2>
                    <ul>
                        {dinners}
                    </ul>
                </section>

            </div>
        )
    }
}


export default MealPlanPage