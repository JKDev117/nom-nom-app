import React from 'react';
import './AddMenuItem.css';
import config from '../../config';
import { MyContext } from '../../MyProvider';
import TokenService from '../../services/token-service';

class AddMenuItem extends React.Component {
    
    static contextType = MyContext;

    async pushPath() {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 1000)
        });
        await promise
        this.props.history.push('/menu')
    }
          
    handleSubmit = e => {
        e.preventDefault()
        const { name, image_url, category } = e.target
        const calories = parseInt(e.target.calories.value) || null
        const carbs = parseInt(e.target.carbs.value) || null
        const protein = parseInt(e.target.protein.value) || null
        const fat = parseInt(e.target.fat.value) || null
        const menu_item = {
            name: name.value,
            image_url: image_url.value,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat,
            category: category.value
        }

        console.log('menu_item @handleSubmit @AddMenuItem.js', menu_item)

        const fetchUrl = config.REACT_APP_API_BASE_URL + '/menu'
        const options = {
            method: 'POST',
            body: JSON.stringify(menu_item),
            headers: {
                "content-type": "application/json; charset=utf-8",
                //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
                "Authorization": `Bearer ${TokenService.getAuthToken()}`,
            }
        }
        fetch(fetchUrl, options)
            .then(res => {
                if(!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(resJson => this.context.addMenuItem(resJson, ()=>this.props.history.push('/menu')))
            //.then(this.pushPath())
            .catch(error => console.log(error))
    }

    render(){
        console.log('props', this.props)

        return(
            <div className="AddMenuItem">
                <h1 className="add-menu-item-title">Add New Menu Item</h1>
                <section>
                    <form onSubmit={this.handleSubmit}>
                        <img src="http://vignette1.wikia.nocookie.net/doom/images/4/4c/Chef-hat-png-13.png/revision/latest?cb=20170308012617" alt="chef-hat"/><br/>
                        <label htmlFor="name"> Name: </label>
                        <input type="text" id="name" name="name" required/><br/>

                        <label htmlFor="image_url"> Image URL: </label>
                        <input type="text" id="image_url" name="image_url"/><br/>

                        <label htmlFor="calories"> Calories: </label>
                        <input type="number" id="calories" name="calories"/><br/>

                        <label htmlFor="carbs"> Carbs(g): </label>
                        <input type="number" id="carbs" name="carbs"/><br/>

                        <label htmlFor="protein"> Protein(g): </label>
                        <input type="number" id="protein" name="protein"/><br/>

                        <label htmlFor="fat"> Fat(g): </label>
                        <input type="number" id="fat" name="fat"/><br/>

                        <label htmlFor="category">Category: </label>
                            <select id="category" name="category" required>
                                <option selected hidden value=""> -- select an option -- </option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select><br/>
                        <button className="add-to-menu-button" type='submit'>Add to Menu</button>
                        <button className="cancel-buttton" onClick={() => this.props.history.push('/menu')}>Cancel</button>
                    </form>
                </section>
            </div>
        )
    }
}


export default AddMenuItem;