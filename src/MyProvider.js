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
        console.log('@MyProvider.js setMenuItems')
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

    /* MEAL PLAN METHODS ------------------------------------------------------------------------------------------------------------------------ */
    checkMealPlanForItem = item => {
      const { meal_plan } = this.state
      //console.log('meal_plan', meal_plan)
      return meal_plan.some(element => element.menu_item_id === item.id)
    }
    
    setMealPlan = items => {
        console.log('@MyProvider.js setMealPlan')
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

    addToMealPlan = (user_id, ids_of_checked_menu_items, callback) => {
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
                .then(resJson => {
                    console.log('resJson @MyProvider.js @addToMealPlan', resJson)
                    this.setState({meal_plan: [...this.state.meal_plan, resJson]}, callback)
                    console.log('meal_plan @MyProvider.js @addToMealPlan', this.state.meal_plan)
                    //this.setState({meal_plan_item_count: resJson})
                    //console.log(this.state.meal_plan_item_count)
                })
                .catch(error => console.log(error))//this.setState({error}))
                //console.log(this.state.meal_plan_count)      
        }//end for loop
    }//end addToMealPlan()

    removeFromMealPlan = id => {
        console.log('@MyProvider.js @removeFromMealPlan plan item id', id)
        //console.log('this.state.meal_plan @MyProvider.js @removeFromMealPlan', this.state.meal_plan)

        const url = config.REACT_APP_API_BASE_URL + '/plan';
        const options = {
          method: 'DELETE',
          headers: {
            //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
            "Authorization": `Bearer ${TokenService.getAuthToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id: id})
        }
      
        fetch(url, options)
            .then(res => {
              console.log('res.status', res.status)
              if(!res.ok){
                return res.json().then(e => Promise.reject(e))
              }
              return;
            })
            .then(() => {
              //const newMenuCount = [...this.state.meal_plan_count]
              //const id = newMenuCount.findIndex(p => p.menu_item_id === item.id || item.menu_item_id)
              //if(newMenuCount[id] !== undefined && newMenuCount[id].occurrence > 0){
              //  newMenuCount[id].occurrence--
              //}
              const { meal_plan } = this.state
              for(let i=0; meal_plan[i] !== undefined; i++){
                if(meal_plan[i].id === id){
                //if(JSON.stringify(meal_plan[i]) === JSON.stringify(item)){
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
              console.log('@MyProvider.js @removeFromMealPlan meal_plan after setting state', meal_plan)
              return;
            })
            .catch(error => console.log(error))

    }//end removeFromMenuPlan()

    /*
    componentDidMount(){
        //GET /menu
        const url = config.REACT_APP_API_BASE_URL + '/menu';
        const options = {
          method: 'GET',
          headers: {
            //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
            "Authorization": `Bearer ${TokenService.getAuthToken()}`,
            "Content-Type": "application/json",
          }
        }
        fetch(url, options)
          .then(res => {
            if(!res.ok){
              return res.json().then(e => Promise.reject(e))
            }
            return res.json()
          })
          .then(this.setMenuItems)
          .catch(error => console.log(error))//this.setState({error}))

        //GET /plan
        const url2 = config.REACT_APP_API_BASE_URL + '/plan';
        const options2 = {
          method: 'GET',
          headers: {
            //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
            "Authorization": `Bearer ${TokenService.getAuthToken()}`,
            "Content-Type": "application/json",
          }
        }
        fetch(url2, options2)
          .then(res => {
            if(!res.ok){
              return res.json().then(e => Promise.reject(e))
            }
            //console.log('res.json()', res.json())
            return res.json()
          })
          .then(this.setMealPlan)
          .catch(error => console.log(error))
    }
    */

    /*
    componentDidMount(){
      //GET /menu
      const url = config.REACT_APP_API_BASE_URL + '/menu';
      const options = {
        method: 'GET',
        headers: {
          //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
          "Authorization": `Bearer ${TokenService.getAuthToken()}`,
          "Content-Type": "application/json",
        }
      }
  
      //GET /plan
      const url2 = config.REACT_APP_API_BASE_URL + '/plan';
      const options2 = {
        method: 'GET',
        headers: {
          //"Authorization": `Bearer ${config.REACT_APP_API_KEY}`,
          "Authorization": `Bearer ${TokenService.getAuthToken()}`,
          "Content-Type": "application/json",
        }
      }
      
      Promise.all([
        fetch(url, options),
        fetch(url2, options2)
      ])
      .then(([menuRes, planRes]) => {
        if(!menuRes.ok){
          return menuRes.json().then(e => Promise.reject(e))
        }    
        if(!planRes.ok){
          return planRes.json().then(e => Promise.reject(e))
        }
        return Promise.all([menuRes.json(), planRes.json()])
      })
     .then(([menu, plan]) => {
        this.setMenuItems(menu)
        this.setMealPlan(plan)
      })
      .catch(error => console.log(error))
    }
    */
    

    render(){
        console.log("@MyProvider.js render")
        //console.log('menu_items', this.state.menu_items)
        //console.log('meal_plan', this.state.meal_plan)
        return(
            <MyContext.Provider value={{
                user_id: this.state.user_id,
                menu_items: this.state.menu_items,
                meal_plan: this.state.meal_plan,
                //meal_plan_item_count: this.state.meal_plan_item_count,
                checkMealPlanForItem: this.checkMealPlanForItem,

                setMenuItems: this.setMenuItems,
                addMenuItem: this.addMenuItem,
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


export { MyContext };
