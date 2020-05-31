import React from 'react';
import { Link } from 'react-router-dom';
import './MenuListPage.css';

class MenuListPage extends React.Component {
    
    render(){
        //console.log(this.props.location.pathname)
        const breakfasts = this.props.items.filter(item => item.category === 'Breakfast')
                                           .map((item, i) => 
                                                    <li key={i}>
                                                        <details>
                                                            <summary>{item.name}</summary>
                                                            {item.url ? <img src={item.url} alt={`${item.name}`}/> : "" }

                                                            <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g   <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>

                                                        </details>

                                                        <button>Add to Today's Meal Plan</button>
                                                        <button>Remove from Today's Meal Plan</button>
                                                        <Link to='/edit-menu-item'>
                                                            <button>Edit Meal Item</button>
                                                        </Link>    
                                                    </li>)
        //console.log(breakfasts)
        
        const lunches = this.props.items.filter(item => item.category === 'Lunch')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <details>
                                                            <summary>{item.name}</summary>
                                                            {item.url ? <img src={item.url} alt={`${item.name}`}/> : "" }

                                                            <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g   <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        </details>
                                                        <button>Add to Today's Meal Plan</button>
                                                        <button>Remove from Today's Meal Plan</button>
                                                        <Link to='/edit-menu-item'>
                                                            <button>Edit Meal Item</button>
                                                        </Link> 

                                                    </li>)
        //console.log(lunches)
        
        const dinners = this.props.items.filter(item => item.category === 'Dinner')
                                        .map((item, i) => 
                                                    <li key={i}>
                                                        <details>
                                                            <summary>{item.name}</summary>
                                                            {item.url ? <img src={item.url} alt={`${item.name}`}/> : "" }

                                                            <p className="mealplan-nutritional-info">(<u>Calories</u>: {item.calories} <u>Carbs</u>: {item.carbs}g   <u>Protein</u>: {item.protein}g <u>Fat</u>: {item.fat}g)</p>
                                                        </details>
                                                        <button>Add to Today's Meal Plan</button>
                                                        <button>Remove from Today's Meal Plan</button>
                                                        <Link to='/edit-menu-item'>
                                                            <button>Edit Meal Item</button>
                                                        </Link> 

                                                    </li>)                                                   
        //console.log(dinners)

        return(
            <div className="MenuListPage">
                <nav>
                    <Link to="/">Home</Link>
                    {" "}
                    <Link to="/meal-plan">My Meal Plan</Link>
                </nav>

                <h1>My Nom Nom Menu</h1>
                <section className="menuCategory">Breakfast Menu <br/>
                    <ul>
                        {breakfasts}
                    </ul>
                    <Link to='/add-menu-item'>
                        <button>+ Add New Menu Item</button>
                    </Link>
                </section>
                <section className="menuCategory">Lunch Menu <br/>
                    <ul>
                        {lunches}
                    </ul>
                    <Link to='/add-menu-item'>
                        <button>+ Add New Menu Item</button>
                    </Link>
                </section>
                <section className="menuCategory">Dinner Menu <br/>
                    <ul>
                        {dinners}
                    </ul>
                    <Link to='/add-menu-item'>
                        <button>+ Add New Menu Item</button>
                    </Link>
                </section>
            </div>
        )
    }
}


export default MenuListPage