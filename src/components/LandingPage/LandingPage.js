import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

class LandingPage extends React.Component {
    render(){
        return(
            <div className="LandingPage">
                <h1 className="app-name">My Nom Nom Menu & Meal Planner</h1>
                <img className="chef-kirby" src='/images/chef-kirby.png' alt='chef-kirby'/>
                <p className="about-app">This app lets you create your own menu & plan what you want to eat today.</p>
                <section className="landing-page-links">
                    <Link className="landing-page-link" to='/menu'>
                        <img className="food-menu" src="/images/food-menu.png" alt="food-menu"/>
                        <br/>My Menu
                    </Link>
                    <Link className="food-icon-link landing-page-link" to='/meal-plan'>
                        <img className="food-icon" src="/images/cutlery.png" alt="food-icon"/>
                        <br/>Today's Meals
                    </Link>
                </section>
            </div>
        );
    };
};

export default LandingPage;




