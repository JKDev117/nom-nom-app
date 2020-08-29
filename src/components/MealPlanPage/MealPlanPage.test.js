import React from 'react';
import ReactDOM from 'react-dom';
import MealPlanPage from './MealPlanPage.js';
import { BrowserRouter } from 'react-router-dom';
import MyProvider from '../../MyProvider.js';


it('renders without crashing', () => {
    const div = document.createElement('div');
    
    ReactDOM.render(
    <BrowserRouter>
        <MyProvider>
            <MealPlanPage />
        </MyProvider>
    </BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
})