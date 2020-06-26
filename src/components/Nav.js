import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';
import TokenService from '../services/token-service';

export default function Nav() {
  let location = useLocation()
  
  switch (location.pathname) {
    case '/':
      return (
        <nav className='login-register-links'>
            { TokenService.hasAuthToken() ? 
             <Link to="/">Logout</Link>
                :
             <>
              <Link to="/login">Login</Link>
              {' '}
              <Link to='/'>Register</Link>
             </>    
            }
        </nav>
      )
    case '/menu':
      return (
        <nav>
            <Link to="/">Home</Link>
            {" "}
            <Link to={'/meal-plan'}>My Meal Plan</Link>
            {" "}
            <Link to="/" className='logout-link'>Logout</Link>
        </nav>        
      )
    case '/meal-plan':
      return (
        <nav>
            <Link to="/">Home</Link>
            {" "}
            <Link to={'/menu'}>My Menu</Link>
            {" "}
            <Link to="/" className='logout-link'>Logout</Link>
        </nav>        
      )
    case '/add-menu-item' || 'edit-menu-item':
      return (
        <nav className='login-register-nav'>
             <Link to="/">Logout</Link>
        </nav>
      )
    case '/login' || '/register':
      return (
        <nav>
          <h1>
            <Link to='/' className='logo'>
              My Nom Nom Menu & Meal Planner
            </Link>  
          </h1>
        </nav>    
      )
    default:
      break; 
  }

}


//style={{'text-decoration': 'none'}}
