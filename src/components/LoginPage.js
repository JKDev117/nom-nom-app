import React from 'react'

class LoginPage extends React.Component {

    /*
    static defaultProps = {
        onLoginSuccess: () => {}
    }

    state = {error: null}
    */

    handleSubmitBasicAuth = ev => {
        ev.preventDefault()
        const { user_name, password } = ev.target

        console.log('login form submitted')
        console.log(user_name.value, password.value)
    
        
    
    
    }


    render(){

        return(
            <>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmitBasicAuth}>
                    <label htmlFor='login_user_name'>
                        Username:
                    </label>
                    <input type='text' name='user_name' id='login_user_name' required/><br/>
                    
                    <label htmlFor='login_password'>
                        Password:
                    </label>
                    <input type='password' name='password' id='login_password' required/><br/>
                    <button type="submit">Submit</button>
                </form>
            </>
        )

    }

}


export default LoginPage