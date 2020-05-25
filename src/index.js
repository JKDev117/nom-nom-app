import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ITEMS from './store.js'

ReactDOM.render(
    <App store={ITEMS}/>,
    document.getElementById('root')
);




