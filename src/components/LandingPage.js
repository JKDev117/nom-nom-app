import React from 'react';
//import { Link } from 'react-router-dom';
import './LandingPage.css'

class LandingPage extends React.Component {
    render(){
        return(
            <div className="LandingPage">
                <h1>My Nom Nom Menu & Meal Planner</h1>
                <p>This app lets you create your own menu & plan what you want to eat today.</p>
                <a href='/menu'>Go To My Menu</a><br/>
                <a href='/meal-plan'>Go To Today's Meal Plan</a>
            </div>
        )
    }
}

export default LandingPage


