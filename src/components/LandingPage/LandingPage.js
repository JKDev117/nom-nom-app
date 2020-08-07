import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

class LandingPage extends React.Component {
    render(){
        console.log('@LandingPage.js render')

        return(
            <div className="LandingPage">
                <h1 className="app-name">My Nom Nom Menu & Meal Planner</h1>
                <img src='https://66.media.tumblr.com/5d1dbc72c1a1eaa6bd499460ea096999/e2b38183373ea62d-ed/s250x400/ccb34fec6534449810ee3252859d08731c16e310.png' alt='chef-kirby'/>

                <p className="about-app">This app lets you create your own menu & plan what you want to eat today.</p>
                <section className="landing-page-links">
                    
                    <Link className="landing-page-link" to='/menu'>
                        <img src="https://image.flaticon.com/icons/png/512/289/289658.png" alt="food-menu"/>
                        <br/>My Menu
                    </Link>
                     
                    <Link className="landing-page-link" to='/meal-plan'>
                        <img src="https://sunnybrook.ca/uploads/1/programs/schulich-heart-centre/cutlery.png" alt="food-icon"/>
                        <br/>Today's Meals
                    </Link>
                    
                </section>
            </div>
        )
    }
}

export default LandingPage


