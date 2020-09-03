import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import './LoginPage.css';

class LoginPage extends React.Component {

    //to store any error messages that occur when the user tries to login
    state = { error: null };

    //to handle a successful login attempt
    handleLoginSuccess = () => {
        const { history } = this.props;
        history.push('/');
    };
    
    //to handle when the user submits information to log in
    handleSubmitJwtAuth = ev => {
        ev.preventDefault();
        const { user_name, password } = ev.target;
        AuthApiService.postLogin({
            user_name: user_name.value,
            password: password.value,
        })
            .then(res => {
                user_name.value = '';
                password.value = '';
                this.handleLoginSuccess();
            })
            .catch(res => {
                this.setState({ error: res.error });
            });
    };
    
    render(){
        const { error } = this.state;
        return(
            <div className="LoginPage">
                <h1 className="login-title">Login</h1>
                
                <img className="chef-mario-and-yoshi" src='/images/chef-mario-yoshi.png' alt='chef-mario-and-yoshi'/>
                <div className="demo-credentials">
                    <h3>Demo Credentials</h3>
                    <p>username: dunder_mifflin</p>
                    <p>password: Password1!</p>
                </div>
                <div role="alert">
                    {error && <p className='red'>{error}</p>}
                </div>
                <form onSubmit={this.handleSubmitJwtAuth}>

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
        );
    };
};


export default LoginPage;