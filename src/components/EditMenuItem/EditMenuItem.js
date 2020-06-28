import React from 'react';
import './EditMenuItem.css'
import config from '../../config'
import MenuContext from '../../MenuContext'
import TokenService from '../../services/token-service';

class EditMenuItem extends React.Component {

    static contextType = MenuContext;

    state = {

    }

    loadMenuItem = items => {
        this.setState({
          ...items
        })
    }

    deleteMenuItem = id => {
        const fetchUrl = config.REACT_APP_API_BASE_URL + '/menu/' + id
        const options = { 
            method: 'DELETE',
            headers:{ 
                "content-type": "application/json",
                //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
                "Authorization": `Bearer ${TokenService.getAuthToken()}`,
            }
        }
        fetch(fetchUrl, options)
            .then(res => {
                if(!res.ok){
                    return res.json().then(error =>  Promise.reject(error))
                }
                return;
            })
            .then(this.context.removeMenuItem(id))
            .then(this.props.history.push('/menu'))
            .catch(error => console.error(error))
    }

    handleChange = event => {
        console.log("event name:", event.target.name)
        console.log("typeof:", typeof(event.target.value))
        console.log("length:", event.target.value.length)
        if(event.target.value.length === 0){
            this.setState({
                [event.target.name]: null
            })
        } else if(/calories|carbs|protein|fat/.test(event.target.name) === true){
            this.setState({
                [event.target.name]: parseInt(event.target.value)
            })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        /*
        const { name, image_url, category } = event.target
        //console.log(typeof(image_url.value), image_url.value.length)
        const calories = parseInt(event.target.calories.value)
        const carbs = parseInt(event.target.carbs.value)
        const protein = parseInt(event.target.protein.value)
        const fat = parseInt(event.target.fat.value)
        const menu_item = {
            name: name.value,
            image_url: image_url.value,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat,
            category: category.value
        }
        */
        const fetchUrl = config.REACT_APP_API_BASE_URL + '/menu/' + this.props.match.params.item_id
        const options = { 
            method: 'PATCH',
            body: JSON.stringify(this.state),
            headers:{ 
                "content-type": "application/json",
                //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
                "Authorization": `Bearer ${TokenService.getAuthToken()}`,
            }
        }
        fetch(fetchUrl, options)
            .then(res => {
                if(!res.ok){
                    return res.json().then(error => Promise.reject(error))
                }
                return
            })
            .then(this.context.updateMenuItem(this.state))
            .then(this.props.history.push('/menu'))
            .catch(error => console.error(error))
    }

    
    componentDidMount(){
        const item_id = this.props.match.params.item_id
        const fetchUrl = config.REACT_APP_API_BASE_URL + '/menu/' + item_id
        const options = { 
            method: 'GET',
            headers:{ 
                "content-type": "application/json",
                //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
                "Authorization": `Bearer ${TokenService.getAuthToken()}`,
            }
        }
        fetch(fetchUrl, options)
            .then(res => {
                if(!res.ok){
                    return  res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(this.loadMenuItem)
            .catch(error => 
                console.error({ error })
                //this.setState({ error })
            )
    }

    render(){
        console.log("state at render", this.state)
        const { id, name, image_url, calories, carbs, protein, fat, category } = this.state
        return(
            <div className="EditMenuItem">
                <h1>Edit Menu Item</h1>
                <section>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name"> Name: </label>
                        <input type="text" id="name" name="name" value={name || ''} onChange={this.handleChange} required/><br/>

                        <label htmlFor="image-url"> Image URL: </label>
                        <input type="url" id="image_url" name="image_url" value={image_url || ''} onChange={this.handleChange}/><br/>
                        
                        <label htmlFor="calories"> Calories: </label>
                        <input type="number" id="calories" name="calories" value={calories || ''} onChange={this.handleChange}/><br/>

                        <label htmlFor="carbs"> Carbs(g): </label>
                        <input type="number" id="carbs" name="carbs" value={carbs || ''} onChange={this.handleChange}/><br/>

                        <label htmlFor="protein"> Protein(g): </label>
                        <input type="number" id="protein" name="protein" value={protein || ''} onChange={this.handleChange}/><br/>

                        <label htmlFor="fat"> Fat(g): </label>
                        <input type="number" id="fat" name="fat" value={fat || ''} onChange={this.handleChange}/><br/>

                        <label htmlFor="category">Category: </label>
                            <select id="category" name="category" value={category || ''} onChange={this.handleChange}>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select><br/>
                        <button type="submit">Update</button>
                        <button onClick={() => this.deleteMenuItem(id)}>Delete</button>
                        <button onClick={() => this.props.history.push('/menu')}>Cancel</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default EditMenuItem