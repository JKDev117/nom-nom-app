import React from 'react';
//import { Link } from 'react-router-dom';
import './MealPlanPage.css';

class MealPlanPage extends React.Component {
    render(){
        return(
            <div className="MenuListPage">
                <nav>
                    <a href="/">Home</a>
                    <a href="/menu">My Menu</a>
                </nav>

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