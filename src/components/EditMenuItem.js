import React from 'react';
import './EditMenuItem.css'

class EditMenuItem extends React.Component {

    



    render(){
        return(
            <div className="EditMenuItem">
                <h1>Edit Menu Item</h1>
                <section>
                    <form>
                        <label htmlFor="name"> Name: </label>
                        <input type="text" id="name" name="name"/><br/>

                        <label htmlFor="image-url"> Image URL: </label>
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
                            <select id="category" name="category" defaultValue="Lunch">
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