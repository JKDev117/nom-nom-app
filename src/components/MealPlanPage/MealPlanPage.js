import React from 'react';
import { Link } from 'react-router-dom';
import './MealPlanPage.css';
import MenuContext from '../../MenuContext';

class MealPlanPage extends React.Component {
    static contextType = MenuContext;

    render(){
        const { menu_plan, removeFromMenuPlan } = this.context

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
                                                        {item.image_url ? <img src={item.image_url} alt={`${item.name}`}/> : "here" }
                                                        <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g  <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        <button onClick={()=>removeFromMenuPlan(item.id)}>Remove from Today's Meal Plan</button>
                                                    </li>)
        //console.log(breakfasts)
        
        const lunches = menu_plan.filter(item => item.category === 'Lunch')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <span>{item.name}</span> <br/>
                                                        {item.image_url ? <img src={item.image_url} alt={`${item.name}`}/> : "" }
                                                        <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g  <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        <button onClick={()=>removeFromMenuPlan(item.id)}>Remove from Today's Meal Plan</button>
                                                    </li>)
        //console.log(lunches)
        
        const dinners = menu_plan.filter(item => item.category === 'Dinner')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <span>{item.name}</span> <br/>
                                                        {item.image_url ? <img src={item.image_url} alt={`${item.name}`}/> : "" }
                                                        <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g  <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        <button onClick={()=>removeFromMenuPlan(item.id)}>Remove from Today's Meal Plan</button>
                                                    </li>)                                                  
        //console.log(dinners)

        return(
            <div className="MenuListPage">
                <h1>Today's Meal Plan</h1>
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