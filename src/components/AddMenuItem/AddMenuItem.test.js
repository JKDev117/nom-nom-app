import React from 'react';
import ReactDOM from 'react-dom';
import AddMenuItem from './AddMenuItem.js';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    
    ReactDOM.render(<BrowserRouter><AddMenuItem /></BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
})