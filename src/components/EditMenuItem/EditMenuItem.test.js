import React from 'react';
import ReactDOM from 'react-dom';
import EditMenuItem from './EditMenuItem.js';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';


it('renders without crashing', () => {
    const div = document.createElement('div');
    
    ReactDOM.render(
        <BrowserRouter>
            <Route path='/edit-menu-item/:item_id' component={EditMenuItem} />
        </BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
})