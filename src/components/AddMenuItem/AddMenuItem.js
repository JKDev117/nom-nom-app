import React from 'react';
import './AddMenuItem.css'
import config from '../../config'
import { MyContext } from '../../MyProvider';
import TokenService from '../../services/token-service';

class AddMenuItem extends React.Component {

    state = {
        error: null
    }

    static contextType = MyContext;

    handleSubmit = e => {
        e.preventDefault()
        const { name, image_url, category } = e.target
        const calories = parseInt(e.target.calories.value)
        const carbs = parseInt(e.target.carbs.value)
        const protein = parseInt(e.target.protein.value)
        const fat = parseInt(e.target.fat.value)
        const menu_item = {
            name: name.value,
            image_url: image_url.value,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat,
            category: category.value
        }
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
                    return  res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(data => {
                this.context.addMenuItem(data)
                this.props.history.push('/menu')
            })
            .catch(error => {
                this.setState({ error })
            })
    }


    render(){
        return(
            <div className="AddMenuItem">
                <h1>Add New Menu Item</h1>
                <section>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name"> Name: </label>
                        <input type="text" id="name" name="name" required/><br/>

                        <label htmlFor="image_url"> Image URL: </label>
                        <input type="url" id="image_url" name="image_url"/><br/>

                        <label htmlFor="calories"> Calories: </label>
                        <input type="text" id="calories" name="calories"/><br/>

                        <label htmlFor="carbs"> Carbs(g): </label>
                        <input type="text" id="carbs" name="carbs"/><br/>

                        <label htmlFor="protein"> Protein(g): </label>
                        <input type="text" id="protein" name="protein"/><br/>

                        <label htmlFor="fat"> Fat(g): </label>
                        <input type="text" id="fat" name="fat"/><br/>

                        <label htmlFor="category">Category: </label>
                            <select id="category" name="category" defaultValue="Lunch" required>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select><br/>
                        <button type='submit'>Add to Menu</button>
                        <button onClick={() => this.props.history.push('/menu')}>Cancel</button>
                    </form>
                    
                </section>
            </div>
        )
    }
}

export default AddMenuItem