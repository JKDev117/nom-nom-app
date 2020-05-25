import React from 'react';
import { Link } from 'react-router-dom';
import './MealPlanPage.css';

class MealPlanPage extends React.Component {
    render(){
        return(
            <div className="MenuListPage">
                <nav>
                    <Link to="/">Home</Link>
                    {" "}
                    <Link to="/menu">My Menu</Link>
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