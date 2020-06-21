import React from 'react';
import './EditMenuItem.css'
import config from '../config'

class EditMenuItem extends React.Component {

    state = {
                
    }

    loadMenuItem = items => {
        this.setState({
          ...items
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount(){
        const item_id = this.props.match.params.item_id
        const fetchUrl = config.REACT_APP_API_BASE_URL + '/menu/' + item_id
        const options = { 
            method: 'GET',
            headers:{ 
                "content-type": "application/json",
                "Authorization": `Bearer ${config.REACT_APP_API_KEY}`
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
            .catch(error => {
                this.setState({ error })
            })
    }


    render(){
        const { name, image_url, calories, carbs, protein, fat, category } = this.state
        return(
            <div className="EditMenuItem">
                <h1>Edit Menu Item</h1>
                <section>
                    <form>
                        <label htmlFor="name"> Name: </label>
                        <input type="text" id="name" name="name" value={name || ''} onChange={this.handleChange}/><br/>

                        <label htmlFor="image-url"> Image URL: </label>
                        <input type="url" id="image_url" name="image_url" value={image_url || ''} onChange={this.handleChange}/><br/>
                        
                        <label htmlFor="calories"> Calories: </label>
                        <input type="text" id="calories" name="calories" value={calories || ''} onChange={this.handleChange}/><br/>

                        <label htmlFor="carbs"> Carbs(g): </label>
                        <input type="text" id="carbs" name="carbs" value={carbs || ''} onChange={this.handleChange}/><br/>

                        <label htmlFor="protein"> Protein(g): </label>
                        <input type="text" id="protein" name="protein" value={protein || ''} onChange={this.handleChange}/><br/>

                        <label htmlFor="fat"> Fat(g): </label>
                        <input type="text" id="fat" name="fat" value={fat || ''} onChange={this.handleChange}/><br/>

                        <label htmlFor="category">Category: </label>
                            <select id="category" name="category" value={category || ''} onChange={this.handleChange}>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select><br/>
                        <button onClick={e => e.preventDefault()}>Update</button>
                        <button onClick={e => {e.preventDefault(); this.props.history.push('/menu')}}>Cancel</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default EditMenuItem