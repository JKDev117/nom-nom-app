import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';
import TokenService from '../../services/token-service';
import IdleService from '../../services/idle-service';

export default function Nav() {
  let location = useLocation()
  
  //when the user logs out
  function handleLogoutClick(){
    TokenService.clearAuthToken()
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
  }

  //Logout link
  function renderLogOutLink(){
    return(
        <Link to="/" 
              className='logout-link' 
              onClick={()=>handleLogoutClick()}>Logout</Link>        
    )
  }

  //Login link
  function renderLogInLink(){
    return(
      <Link to="/login" className='login-link'>Login</Link>
    )
  }

  //depending on the pathname, render the Nav component as follows
  switch (location.pathname) {
    case '/':
        return (
          <nav>
              { TokenService.hasAuthToken() ? 
                  renderLogOutLink()
                    :
                  <>  
                    <Link to='/register' className='register-link'>Register</Link>
                    {' '}
                    {renderLogInLink()}
                  </> 
              }
          </nav>
        ) 
    case '/menu':
        return (
          <nav>
              <Link className="home-link" to="/">Home</Link>
              {" "}
              <Link className="meal-plan-link" to={'/meal-plan'}>My Meal Plan</Link>
              {" "}
              {renderLogOutLink()}
          </nav>        
        )
    case '/meal-plan':
        return (
          <nav>
              <Link className="home-link" to="/">Home</Link>
              {" "}
              <Link className="my-menu-link" to={'/menu'}>My Menu</Link>
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
    case '/login':
        return (
          <nav>
            <h1>
              <Link to='/' className='logo app-name'>
                My Nom Nom Menu & Meal Planner
              </Link>  
            </h1>
          </nav>    
        )
    case '/register':
        return (
          <nav>
            <h1>
              <Link to='/' className='logo app-name'>
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