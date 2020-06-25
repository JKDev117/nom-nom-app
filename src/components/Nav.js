import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';
//import TokenService from '../services/token-service';

export default function Nav() {
  let location = useLocation()
  
  if(location.pathname === '/'){
    return (
        <nav className='login-register-nav'>
            <Link to="/login">Login</Link>
              {" "}
            {/*<Link to={'/register'}>Register</Link>*/}
        </nav>
    )
  } else if(location.pathname === '/menu') {
    return (
        <nav>
            <Link to="/">Home</Link>
            {" "}
            <Link to={'/meal-plan'}>My Meal Plan</Link>
        </nav>
      );
  } else if(location.pathname === '/meal-plan') {
    return (
        <nav>
            <Link to="/">Home</Link>
            {" "}
            <Link to={'/menu'}>My Menu</Link>
        </nav>
      );
  } else {
      return <></>
  }
}
