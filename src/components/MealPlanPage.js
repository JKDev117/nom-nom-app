import React from 'react';
import './MealPlanPage.css'

class MealPlanPage extends React.Component {
    render(){
        return(
            <div className="MenuListPage">
                <h1>Today's Meal Plan</h1>
                <section>Breakfast</section>
                <section>Lunch</section>
                <section>Dinner</section>
                <section>Total</section>
            </div>
        )
    }
}

export default MealPlanPage