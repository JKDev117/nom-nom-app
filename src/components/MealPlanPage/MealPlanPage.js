import React from 'react';
import './MealPlanPage.css';
import { MyContext } from '../../MyProvider';
import config from '../../config';
import TokenService from '../../services/token-service';

class MealPlanPage extends React.Component {
    static contextType = MyContext;
    
    //at componentDidMount(), retrieve all meal plan items from server
    componentDidMount(){
        //GET /plan
        const url = config.REACT_APP_API_BASE_URL + '/plan';
        const options = {
          method: 'GET',
          headers: {
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
          .then(this.context.setMealPlan)
          .catch(error => console.log(error))
    }

    render(){
        const { meal_plan, removeFromMealPlan } = this.context;
        
        // to calculate total calories, carbs, protein, & fat of all the meal plan items
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
        
        //create an array to store all the breakfast items in the meal plan along with their html elements
        const breakfasts = meal_plan.filter(item => item.category === 'Breakfast')
                                           .map((item, i) => 
                                                    <li className="meal-plan-box" key={i}>
                                                        <h3 className="breakfast-item-name mealplan-item-name">{item.name}</h3> <br/>
                                                        {item.image_url ? 
                                                            <img className="menu-item-image" src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" }
                                                        <p className="mealplan-nutritional-info">          
                                                            <u>Calories</u>: {item.calories} <br/>
                                                            <u>Carbs</u>: {item.carbs}g {' '}  
                                                            <u>Protein</u>: {item.protein}g {' '} 
                                                            <u>Fat</u>: {item.fat}g {' '}
                                                        </p>
                                                        <button className="removeFromMP-button" onClick={()=>removeFromMealPlan(item.id)}>Remove from Today's Meal Plan</button>
                                                    </li>)
        
        //create an array to store all the lunch items in the meal plan along along with their html elements
        const lunches = meal_plan.filter(item => item.category === 'Lunch')
                                        .map((item, i) => 
                                                    <li className="meal-plan-box" key={i}>
                                                        <h3 className="lunch-item-name mealplan-item-name">{item.name}</h3> <br/>
                                                        {item.image_url ? 
                                                            <img className="menu-item-image" src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" 
                                                        }
                                                        <p className="mealplan-nutritional-info">                                               
                                                            <u>Calories</u>: {item.calories} <br/>
                                                            <u>Carbs</u>: {item.carbs}g {' '}  
                                                            <u>Protein</u>: {item.protein}g {' '} 
                                                            <u>Fat</u>: {item.fat}g {' '}                                                    
                                                        </p>
                                                        <button className="removeFromMP-button" onClick={()=>removeFromMealPlan(item.id)}>Remove from Today's Meal Plan</button>
                                                    </li>)

        //create an array to store all the dinner items in the meal plan along with their html elements
        const dinners = meal_plan.filter(item => item.category === 'Dinner')
                                        .map((item, i) => 
                                                    <li className="meal-plan-box" key={i}>
                                                        <h3 className="dinner-item-name mealplan-item-name">{item.name}</h3> <br/>
                                                        {item.image_url ? 
                                                            <img className="menu-item-image" src={item.image_url} alt={`${item.name}`}/> 
                                                                : 
                                                            "" }
                                                        <p className="mealplan-nutritional-info">        
                                                            <u>Calories</u>: {item.calories} <br/>
                                                            <u>Carbs</u>: {item.carbs}g {' '}  
                                                            <u>Protein</u>: {item.protein}g {' '} 
                                                            <u>Fat</u>: {item.fat}g {' '}
                                                        </p>
                                                        <button className="removeFromMP-button" onClick={()=>removeFromMealPlan(item.id)}>Remove from Today's Meal Plan</button>
                                                    </li>)                                                  

        return (
            <div className="MealPlanPage">
                <img className="food-icon" src="/images/cutlery.png" alt="food-icon"/>
                <h1 className="meal-plan-title">Today's Meal Plan</h1>
                <section className="meal-plan-summary">
                    <p>
                        <u>Calories</u>: {calories}<br/> 
                        <u>Carbs</u>: {carbs} g<br/> 
                        <u>Protein</u>: {protein} g<br/> 
                        <u>Fat</u>: {fat} g<br/>
                    </p>
                </section>
                <section className="planCategory breakfastPlanSection">
                    <h2 className="breakfastLabel">Breakfast</h2>
                    <ul>
                        {breakfasts}
                    </ul>
                </section>
                <section className="planCategory lunchPlanSection">
                    <h2 className="lunchLabel">Lunch</h2>
                    <ul>
                        {lunches}
                    </ul>    
                </section>
                <section className="planCategory dinnerPlanSection">
                    <h2 className="dinnerLabel">Dinner</h2>
                    <ul>
                        {dinners}
                    </ul>
                </section>
            </div>
        )
    }
}


export default MealPlanPage;