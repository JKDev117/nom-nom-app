import React from 'react';
import config from './config';
import TokenService from './services/token-service';

const MyContext = React.createContext()

export default class MyProvider extends React.Component {
    state = {
        user_id: null,
        menu_items: [],
        meal_plan: [],
    }

    /* MENU ITEMS METHODS --------------------------------------------- */
    setMenuItems = items => {
        this.setState({
          user_id: items[0].user_id,
          menu_items: items
        })
    }

    addMenuItem = (item, callback) => {
        this.setState({
          menu_items: [...this.state.menu_items, item]
        }, callback)
    }

    removeMenuItem = (itemId, callback) => {
        const updatedMenuItems = this.state.menu_items.filter(itm => 
          itm.id !== itemId
        )
        this.setState({
          menu_items: updatedMenuItems
        }, callback)
    }

    updateMenuItem = (item, callback) => {
        const updatedMenuItems = this.state.menu_items.map(itm => 
          (itm.id === item.id) ?
            item 
              :
            itm
          )
          this.setState({
            menu_items: updatedMenuItems
          }, callback)
    }

    /* MEAL PLAN METHODS ----------------------------------------------- */
    checkMealPlanForItem = item => {
        const { meal_plan } = this.state
        return meal_plan.some(element => element.menu_item_id === item.id)
    }
    
    setMealPlan = items => {
        console.log('@MyProvider.js setMealPlan')
        this.setState({
           meal_plan: items,
        })
    }

    addToMealPlan = (user_id, item_id) => {
        const body = {
          id: item_id,
          user_id: user_id
        }
        const url = config.REACT_APP_API_BASE_URL + '/plan';
        const options = {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${TokenService.getAuthToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        }
        fetch(url, options)
                .then(res => {
                    if(!res.ok){
                        return res.json().then(e => Promise.reject(e))
                    }
                    return res.json()
                })
                .then(resJson => {
                    this.setState({meal_plan: [...this.state.meal_plan, resJson]})

                    const { menu_items } = this.state
                    const menu_items_updated = menu_items.map(
                      item => {
                        if(this.checkMealPlanForItem(item)===true){
                          Object.assign(item, {in_meal_plan: true})
                        } else {
                          Object.assign(item, {in_meal_plan: false})
                        }
                        return item
                      }
                    )
                    this.setState({menu_items: menu_items_updated})
                })
                .catch(error => console.log(error))
    }

    removeFromMealPlan = id => {
        const url = config.REACT_APP_API_BASE_URL + '/plan';
        const options = {
          method: 'DELETE',
          headers: {
            "Authorization": `Bearer ${TokenService.getAuthToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id: id})
        }
        fetch(url, options)
            .then(res => {
              if(!res.ok){
                return res.json().then(e => Promise.reject(e))
              }
              return;
            })
            .then(() => {
              const { meal_plan } = this.state
              for(let i=0; meal_plan[i] !== undefined; i++){
                if(meal_plan[i].id === id){
                  meal_plan.splice(i,1)
                  i--
                }
              }
              const { menu_items } = this.state
              const menu_items_updated = menu_items.map(
                item => {
                    if(this.checkMealPlanForItem(item)===true){
                        Object.assign(item, {in_meal_plan: true})
                    } else {
                        Object.assign(item, {in_meal_plan: false})
                    }
                    return item
                }
              )
              this.setState({
                meal_plan: meal_plan,
                menu_items: menu_items_updated               
              })
              return;
            })
            .catch(error => console.log(error))
    }//end removeFromMenuPlan()

    render(){
        return(
            <MyContext.Provider value={{
                user_id: this.state.user_id,
                menu_items: this.state.menu_items,
                meal_plan: this.state.meal_plan,
                checkMealPlanForItem: this.checkMealPlanForItem,

                setMenuItems: this.setMenuItems,
                addMenuItem: this.addMenuItem,
                removeMenuItem: this.removeMenuItem,
                updateMenuItem: this.updateMenuItem,

                setMealPlan: this.setMealPlan,
                addToMealPlan: this.addToMealPlan,
                removeFromMealPlan: this.removeFromMealPlan,
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export { MyContext };
