import React from 'react';

const MenuContext = React.createContext({
    menu_items: [],
    menu_plan: [],
    addItem: () => {},
    removeItem: () => {},
    updateItem: () => {}
})

export default MenuContext;


