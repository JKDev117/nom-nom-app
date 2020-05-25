import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'


class LandingPage extends React.Component {
    render(){
        return(
            <div className="LandingPage">
                <h1>My Nom Nom Menu & Meal Planner</h1>
                <p>This app lets you create your own menu & plan out what you want to eat for today</p>
                <Link to='/menu'>My Menu</Link><br/>
                <Link to='/meal-plan'>Today's Meal Plan</Link>
            </div>
        )
    }
}

export default LandingPage


