import React from 'react'
//import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'


class RegistrationPage extends React.Component {

    state = {error: null}

    handleRegistrationSuccess = () => {
        const { history } = this.props
        history.push('/')
    }
    
    /*
    handleSubmitBasicAuth = ev => {
        ev.preventDefault()
        const { user_name, password } = ev.target
    
        TokenService.saveAuthToken(
            TokenService.makeBasicAuthToken(user_name.value, password.value)
        )
        
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
                TokenService.saveAuthToken(res.authToken)
                this.handleLoginSuccess()  
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }*/

    handleSubmit = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { first_name, last_name, user_name, password } = ev.target
    
        this.setState({error: null})

        AuthApiService.postUser({
            first_name: first_name.value,
            last_name: last_name.value,
            user_name: user_name.value,
            password: password.value,
        })
            .then(user => {
                first_name.value = ''
                last_name.value = ''
                user_name.value = ''
                password.value = ''
                this.handleRegistrationSuccess()  
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }
    
    
    render(){

        return(
            <>
                <h1>Create a Nom Nom Account</h1>
                <form onSubmit={()=>{}}>
                    <label htmlFor='first_name'>
                        First Name:
                    </label>
                    <input type='text' name='first_name' id='first_name' required/><br/>

                    <label htmlFor='last_name'>
                        Last Name:
                    </label>
                    <input type='text' name='last_name' id='last_name' required/><br/>
                    
                    <label htmlFor='register_user_name'>
                        Username:
                    </label>
                    <input type='text' name='user_name' id='register_user_name' required/><br/>
                    
                    <label htmlFor='register_password'>
                        Password:
                    </label>
                    <input type='password' name='password' id='register_password' required/><br/>
                    
                    <button type="submit">Create account</button>
                </form>
            </>
        )

    }

}


export default RegistrationPage