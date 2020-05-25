import React from 'react';
//import { Link } from 'react-router-dom';
import './MenuListPage.css';

class MenuListPage extends React.Component {
    render(){
        const breakfasts = this.props.items.filter(item => item.category === 'Breakfast').map(item => item.name)
        console.log(breakfasts)
        
        const lunches = this.props.items.filter(item => item.category === 'Lunch').map(item => item.name)
        console.log(lunches)
        
        const dinners = this.props.items.filter(item => item.category === 'Dinner').map(item => item.name)
        console.log(dinners)

        return(
            <div className="MenuListPage">
                <nav>
                    <a href="/">Home</a>
                    <a href="/meal-plan">My Meal Plan</a>
                </nav>
                <h1>Menu List</h1>
                <section>Breakfast Menu
                </section>
                <section>Lunch Menu <br/>

                </section>
                <section>Dinner Menu <br/>

                </section>
            </div>
        )
    }
}

export default MenuListPage