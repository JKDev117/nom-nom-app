import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

class LandingPage extends React.Component {
    render(){
        return(
            <div className="LandingPage">
                <h1>My Nom Nom Menu & Meal Planner</h1>
                <p>This app lets you create your own menu & plan what you want to eat today.</p>
                <section className="landing-page-links">
                    <Link to='/menu'>Go To My Menu</Link><br/>
                    <Link to='/meal-plan'>Go To Today's Meal Plan</Link>
                </section>
            </div>
        )
    }
}

export default LandingPage


