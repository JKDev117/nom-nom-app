import React from 'react';
import { Link } from 'react-router-dom';
import './MenuListPage.css';


class MenuListPage extends React.Component {
    render(){
        const breakfasts = this.props.items.filter(item => item.category === 'Breakfast')
                                           .map((item, i) => 
                                                    <li key={i}>
                                                        <details>
                                                            <summary>{item.name}</summary>
                                                            <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g   <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        </details>
                                                        <button>Add to Today's Meal Plan</button>
                                                        <button>Remove from Today's Meal Plan</button>
                                                        <a href='/edit-menu-item'>
                                                            <button>Edit Meal Item</button>
                                                        </a>    
                                                    </li>)
        //console.log(breakfasts)
        
        const lunches = this.props.items.filter(item => item.category === 'Lunch')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <details>
                                                            <summary>{item.name}</summary>
                                                            <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g   <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        </details>
                                                        <button>Add to Today's Meal Plan</button>
                                                        <button>Remove from Today's Meal Plan</button>
                                                        <a href='/edit-menu-item'>
                                                            <button>Edit Meal Item</button>
                                                        </a> 

                                                    </li>)
        //console.log(lunches)
        
        const dinners = this.props.items.filter(item => item.category === 'Dinner')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <details>
                                                            <summary>{item.name}</summary>
                                                            <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g   <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        </details>
                                                        <button>Add to Today's Meal Plan</button>
                                                        <button>Remove from Today's Meal Plan</button>
                                                        <a href='/edit-menu-item'>
                                                            <button>Edit Meal Item</button>
                                                        </a> 

                                                    </li>)                                                   
        //console.log(dinners)

        return(
            <div className="MenuListPage">
                <nav>
                    <a href="/">Home</a>
                    {" "}
                    <a href="/meal-plan">My Meal Plan</a>
                </nav>

                <h1>My Nom Nom Menu</h1>
                <section className="menuCategory">Breakfast Menu <br/>
                    <ul>
                        {breakfasts}
                    </ul>
                    <a href='/add-menu-item'>
                        <button>+ Add New Menu Item</button>
                    </a>
                </section>
                <section className="menuCategory">Lunch Menu <br/>
                    <ul>
                        {lunches}
                    </ul>
                    <a href='/add-menu-item'>
                        <button>+ Add New Menu Item</button>
                    </a>
                </section>
                <section className="menuCategory">Dinner Menu <br/>
                    <ul>
                        {dinners}
                    </ul>
                    <a href='/add-menu-item'>
                        <button>+ Add New Menu Item</button>
                    </a>
                </section>
            </div>
        )
    }
}


export default MenuListPage