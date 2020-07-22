import React from 'react';
import config from './config';
import TokenService from './services/token-service';

const MyContext = React.createContext()

export default class MyProvider extends React.Component {
    state = {
        user_id: null,
        menu_items: [],
        meal_plan: [],
        //meal_plan_item_count: []
    }

    /* MENU ITEMS METHODS ------------------------------------------------------------------------------------------------------------------------ */
    setMenuItems = items => {
        this.setState({
          user_id: items[0].user_id,
          menu_items: items
        })
    }

    addMenuItem = item => {
        this.setState({
          menu_items: [...this.state.menu_items, item]
        })
    }

    removeMenuItem = itemId => {
        const updatedMenuItems = this.state.menu_items.filter(itm => 
          itm.id !== itemId
        )
        this.setState({
          menu_items: updatedMenuItems
        })
    }

    updateMenuItem = item => {
        const updatedMenuItems = this.state.menu_items.map(itm => 
          (itm.id === item.id) ?
            item 
              :
            itm
          )
          this.setState({
            menu_items: updatedMenuItems
          })
    }

    /* MEAL PLAN METHODS ------------------------------------------------------------------------------------------------------------------------ */
    setMealPlan = items => {
        this.setState({
           meal_plan: items,
        })
    }

    /*
    checkMealPlanItemCounts = id => {
        const { meal_plan_item_count } = this.state
        for(let element of meal_plan_item_count){
            if(element.menu_item_id === id){
                return `Added: ${element.count}`
            }
        }
        return 'Added: '
    }
    */

    addToMealPlan = (user_id, ids_of_checked_menu_items) => {
        //console.log(user_id)
        //console.log(ids_of_checked_menu_items)
        for(let i=0; i < ids_of_checked_menu_items.length; i++){
            const body = {
                id: ids_of_checked_menu_items[i],
                user_id: user_id
            }
            const url = config.REACT_APP_API_BASE_URL + '/plan';
            const options = {
                method: 'POST',
                headers: {
                //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
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
                    //return res.json()
                    return res.json()
                })
                /*
                .then(resJson => {
                    this.setState({meal_plan_item_count: resJson})
                    //console.log(this.state.meal_plan_item_count)
                })*/            
                .catch(error => console.log(error))//this.setState({error}))
                //console.log(this.state.meal_plan_count)
        }//end for loop
    }//end addToMealPlan()

    removeFromMealPlan = item => {
        //console.log('item @MyProvider.js @removeFromMealPlan', item)
        //console.log('this.state.meal_plan @MyProvider.js @removeFromMealPlan', this.state.meal_plan)
        
        const url = config.REACT_APP_API_BASE_URL + '/plan';
        const options = {
          method: 'DELETE',
          headers: {
            //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
            "Authorization": `Bearer ${TokenService.getAuthToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id: item.id})
        }
      
        fetch(url, options)
            .then(res => {
              if(!res.ok){
                return res.json().then(e => Promise.reject(e))
              }
              return;
            })
            .catch(error => console.log(error))
            .then(() => {
              
              //const newMenuCount = [...this.state.meal_plan_count]
              //const id = newMenuCount.findIndex(p => p.menu_item_id === item.id || item.menu_item_id)
              //if(newMenuCount[id] !== undefined && newMenuCount[id].occurrence > 0){
              //  newMenuCount[id].occurrence--
              //}
            
              const { meal_plan } = this.state
              for(let i=0; meal_plan[i] !== undefined; i++){
                if(JSON.stringify(meal_plan[i]) === JSON.stringify(item)){
                  meal_plan.splice(i,1)
                  i--
                }
              }
  
              this.setState({
                meal_plan: meal_plan              
              })
              return;
            })
    }//end removeFromMenuPlan()


    render(){
        return(
            <MyContext.Provider value={{
                user_id: this.state.user_id,
                menu_items: this.state.menu_items,
                meal_plan: this.state.meal_plan,
                //meal_plan_item_count: this.state.meal_plan_item_count,

                setMenuItems: this.setMenuItems,
                addMenuItem: this.addToMealPlan,
                removeMenuItem: this.removeMenuItem,
                updateMenuItem: this.updateMenuItem,

                setMealPlan: this.setMealPlan,
                //checkMealPlanItemCounts: this.checkMealPlanItemCounts,
                addToMealPlan: this.addToMealPlan,
                removeFromMealPlan: this.removeFromMealPlan,
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}


export {MyContext};
