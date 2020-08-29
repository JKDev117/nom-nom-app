import React from 'react'
//import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import './LoginPage.css';

class LoginPage extends React.Component {

    state = {error: null}

    handleLoginSuccess = () => {
        const { history } = this.props
        history.push('/')
    }
    
    handleSubmitBasicAuth = ev => {
        ev.preventDefault()
        const { user_name, password } = ev.target
    
        /*
        TokenService.saveAuthToken(
            TokenService.makeBasicAuthToken(user_name.value, password.value)
        )
        */
        
        user_name.value = ''
        password.value = ''
        this.handleLoginSuccess()  
    }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { user_name, password } = ev.target
    
        AuthApiService.postLogin({
            user_name: user_name.value,
            password: password.value,
        })
            .then(res => {
                user_name.value = ''
                password.value = ''
                //TokenService.saveAuthToken(res.authToken)
                this.handleLoginSuccess()  
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }
    
    
    render(){
        console.log("render@LoginPage.js")
        const { error } = this.state
        return(
            <div className="LoginPage">
                <h1 className="login-title">Login</h1>
                <form onSubmit={this.handleSubmitJwtAuth}>
                    <img className="chef-mario-and-yoshi" src='/images/chef-mario-yoshi.png' alt='chef-mario-and-yoshi'/>

                    <div role="alert">
                        {error && <p className='red'>{error}</p>}
                    </div>    
                    <label htmlFor='login_user_name'>
                        Username:
                    </label>
                    <input type='text' name='user_name' id='login_user_name' required/><br/>
                    
                    <label htmlFor='login_password'>
                        Password:
                    </label>
                    <input type='password' name='password' id='login_password' required/><br/>
                    <button className="login-button" type="submit">Login</button>
                </form>
            </div>
        )

    }

}


export default LoginPage