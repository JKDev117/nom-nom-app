import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

class LandingPage extends React.Component {
    render(){
        console.log('LandingPage.js')

        return(
            <div className="LandingPage">
                <h1>My Nom Nom Menu & Meal Planner</h1>
                <img src='https://66.media.tumblr.com/5d1dbc72c1a1eaa6bd499460ea096999/e2b38183373ea62d-ed/s250x400/ccb34fec6534449810ee3252859d08731c16e310.png' alt='chef-kirby'/>

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


