import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';
import TokenService from '../services/token-service';

export default function Nav() {
  let location = useLocation()
  
  function renderLogOutLink(){
    return(
        <Link to="/" className='logout-link'>Logout</Link>        
    )
  }

  function renderLogInLink(){
    return(
      <Link to="/login" className='login-link'>Login</Link>
    )
  }

  switch (location.pathname) {
    case '/':
      return (
        <nav>
            { TokenService.hasAuthToken() ? 
                renderLogOutLink()
                  :
                <>  
                  <Link to='/' className='register-link'>Register</Link>
                  {' '}
                  {renderLogInLink()}
                </> 
            }
        </nav>
      )
    case TokenService.hasAuthToken():
        return (
          <nav>
                renderLogOutLink()

          </nav>
        )  
    case '/menu':
      return (
        <nav>
            <Link to="/">Home</Link>
            {" "}
            <Link to={'/meal-plan'}>My Meal Plan</Link>
            {" "}
            {renderLogOutLink()}
        </nav>        
      )
    case '/meal-plan':
      return (
        <nav>
            <Link to="/">Home</Link>
            {" "}
            <Link to={'/menu'}>My Menu</Link>
            {" "}
            {renderLogOutLink()}
        </nav>        
      )
    case '/add-menu-item':
      return (
        <nav>
              {renderLogOutLink()}
        </nav>
      )
    case ('/login' || '/register'):
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
      return(
        <nav>
              {renderLogOutLink()}
        </nav>
      )
  }

}


//style={{'text-decoration': 'none'}}
