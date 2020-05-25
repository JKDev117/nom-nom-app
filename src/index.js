import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ITEMS from './store.js'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <App store={ITEMS}/>
    </BrowserRouter>,
    document.getElementById('root')
);




