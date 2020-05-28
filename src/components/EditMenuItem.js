import React from 'react';
import './EditMenuItem.css'

class EditMenuItem extends React.Component {
    render(){
        return(
            <div className="EditMenuItem">
                <h1>Edit Menu Item</h1>
                <section>
                    <form>
                        <label for="name"> Name: </label>
                        <input type="text" id="name" name="name"/><br/>

                        <label for="calories"> Calories: </label>
                        <input type="text" id="calories" name="calories"/><br/>

                        <label for="carbs"> Carbs(g): </label>
                        <input type="text" id="carbs" name="carbs"/><br/>

                        <label for="protein"> Protein(g): </label>
                        <input type="text" id="protein" name="protein"/><br/>

                        <label for="fat"> Fat(g): </label>
                        <input type="text" id="fat" name="fat"/><br/>

                        <label for="category">Category: </label>
                            <select id="category" name="category">
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch" selected>Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select><br/>
                        <button>Update</button>
                        <button>Cancel</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default EditMenuItem