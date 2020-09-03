import React from 'react';
import './EditMenuItem.css';
import config from '../../config';
import { MyContext } from '../../MyProvider';
import TokenService from '../../services/token-service';

class EditMenuItem extends React.Component {

    static contextType = MyContext;

    state = { };

    //to store the properties of the menu item in the state of this class
    loadMenuItem = item => {
        this.setState({
          ...item
        });
    };

    //to handle deletion of the menu item from the menu
    deleteMenuItem = id => {
        const fetchUrl = config.REACT_APP_API_BASE_URL + '/menu/' + id;
        const options = { 
            method: 'DELETE',
            headers:{ 
                "content-type": "application/json",
                "Authorization": `Bearer ${TokenService.getAuthToken()}`,
            }
        };
        fetch(fetchUrl, options)
            .then(res => {
                if(!res.ok){
                    return res.json().then(error =>  Promise.reject(error))
                }
                return;
            })
            .then(this.context.removeMenuItem(id, () => this.props.history.push('/menu')))
            .catch(error => console.log(error));
    };

    /* to handle any changes made to the properties of the menu item in the state of this class before
    the user submits the changes */
    handleChange = event => {
        if(event.target.value.length === 0){
            this.setState({
                [event.target.name]: null
            });
        } else if(/calories|carbs|protein|fat/.test(event.target.name) === true){
            this.setState({
                [event.target.name]: parseInt(event.target.value)
            });
        } else {
            this.setState({
                [event.target.name]: event.target.value
            });
        };
    };

    //to handle user form submission 
    handleSubmit = event => {
        event.preventDefault();
        const { name, category } = event.target;
        const calories = parseInt(event.target.calories.value) || null;
        const carbs = parseInt(event.target.carbs.value) || null;
        const protein = parseInt(event.target.protein.value) || null;
        const fat = parseInt(event.target.fat.value) || null;
        const menu_item = {
            name: name.value,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat,
            category: category.value
        };
        const fetchUrl = config.REACT_APP_API_BASE_URL + '/menu/' + this.props.match.params.item_id;
        const options = { 
            method: 'PATCH',
            body: JSON.stringify(menu_item),
            headers:{ 
                "content-type": "application/json",
                "Authorization": `Bearer ${TokenService.getAuthToken()}`,
            }
        };
        fetch(fetchUrl, options)
            .then(res => {
                if(!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return
            })
            .then(() => this.context.updateMenuItem(menu_item, () => this.props.history.push('/menu')))
            .catch(error => console.log(error));
    };

    //at componentDidMount(), fetch information of the menu item from the server
    componentDidMount(){
        const item_id = this.props.match.params.item_id;
        const fetchUrl = config.REACT_APP_API_BASE_URL + '/menu/' + item_id;
        const options = { 
            method: 'GET',
            headers:{ 
                "content-type": "application/json",
                "Authorization": `Bearer ${TokenService.getAuthToken()}`,
            }
        };
        fetch(fetchUrl, options)
            .then(res => {
                if(!res.ok){
                    return  res.json().then(error => Promise.reject(error));
                }
                return res.json();
            })
            .then(this.loadMenuItem)
            .catch(error => 
                console.error({ error })
            );
    };

    render(){
        const { id, name, calories, carbs, protein, fat, category } = this.state;
        return(
            <div className="EditMenuItem">
                <h1 className="edit-menu-item-title">Edit Menu Item</h1>
                <section>
                    <form onSubmit={this.handleSubmit}>
                        <img className="chef-hat" src="/images/chef-hat.png" alt="chef-hat"/><br/>
                        <label htmlFor="name"> Name: </label>
                        <input type="text" id="name" name="name" value={name || ''} onChange={this.handleChange} required/><br/>
                        
                        <label htmlFor="calories"> Calories: </label>
                        <input type="number" id="calories" name="calories" min="0" value={calories || ''} onChange={this.handleChange}/><br/>

                        <label htmlFor="carbs"> Carbs(g): </label>
                        <input type="number" id="carbs" name="carbs" min="0" value={carbs || ''} onChange={this.handleChange}/><br/>

                        <label htmlFor="protein"> Protein(g): </label>
                        <input type="number" id="protein" name="protein" min="0" value={protein || ''} onChange={this.handleChange}/><br/>

                        <label htmlFor="fat"> Fat(g): </label>
                        <input type="number" id="fat" name="fat" min="0" value={fat || ''} onChange={this.handleChange}/><br/>

                        <label htmlFor="category">Category: </label>
                            <select id="category" name="category" value={category || ''} onChange={this.handleChange}>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select><br/>
                        <button className="update-button" type="submit">Update</button>
                        <button className="delete-menu-item-button" type='button' onClick={() => this.deleteMenuItem(id)}>Delete</button>
                        <button className="cancel-button" onClick={() => this.props.history.push('/menu')}>Cancel</button>
                    </form>
                </section>
            </div>
        );
    };
};

export default EditMenuItem;