import React from 'react';
import './MenuListPage.css'

class MenuListPage extends React.Component {
    render(){
        return(
            <div className="MenuListPage">
                <h1>Menu List</h1>
                <section>Breakfast Menu</section>
                <section>Lunch Menu</section>
                <section>Dinner Menu</section>
            </div>
        )
    }
}

export default MenuListPage