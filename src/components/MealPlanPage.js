import React from 'react';
//import { Link } from 'react-router-dom';
import './MealPlanPage.css';

class MealPlanPage extends React.Component {
    render(){
        let calories = 0;
        let carbs = 0;
        let protein = 0;
        let fat = 0;

        this.props.items.forEach(item => {
            calories += item.calories;
            carbs += item.carbs;
            protein += item.protein;
            fat += item.fat;
        })
        
        const breakfasts = this.props.items.filter(item => item.category === 'Breakfast')
                                           .map((item, i) => 
                                                    <li key={i}>
                                                        <span>{item.name}</span>
                                                        <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g  <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        <button>Remove from Today's Meal Plan</button>
                                                    </li>)
        //console.log(breakfasts)
        
        const lunches = this.props.items.filter(item => item.category === 'Lunch')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <span>{item.name}</span>
                                                        <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g  <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        <button>Remove from Today's Meal Plan</button>
                                                    </li>)
        //console.log(lunches)
        
        const dinners = this.props.items.filter(item => item.category === 'Dinner')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <span>{item.name}</span>
                                                        <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g  <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        <button>Remove from Today's Meal Plan</button>
                                                    </li>)                                                  
        //console.log(dinners)

        return(
            <div className="MenuListPage">
                <nav>
                    <a href="/">Home</a>
                    {" "}
                    <a href="/menu">My Menu</a>
                </nav>

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