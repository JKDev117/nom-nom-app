import React, { Component } from 'react';
import './NotFoundPage.css';

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className='NotFoundPage'>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-message">This page doesn't exist, try going back or using the navigation menu</p>
      </div>
    );
  };
};


