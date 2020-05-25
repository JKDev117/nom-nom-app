import React from 'react';
import { Link } from 'react-router-dom';
import './MenuListPage.css';

class MenuListPage extends React.Component {
    render(){
        return(
            <div className="MenuListPage">
                <nav>
                    <Link to="/">Home</Link>
                    {" "}
                    <Link to="/meal-plan">My Meal Plan</Link>
                </nav>
                <h1>Menu List</h1>
                <section>Breakfast Menu</section>
                <section>Lunch Menu</section>
                <section>Dinner Menu</section>
            </div>
        )
    }
}

export default MenuListPage