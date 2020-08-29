import React from 'react'
import AuthApiService from '../../services/auth-api-service'
import './RegistrationPage.css'

class RegistrationPage extends React.Component {

    //to store any error messages that occur when the user tries to register
    state = { error: null }

    //to handle a successful registration attempt
    handleRegistrationSuccess = () => {
        const { history } = this.props
        history.push('/login')
    }
    
    //to handle when the user submits information to register
    handleSubmit = ev => {
        ev.preventDefault()
        const { first_name, last_name, user_name, password } = ev.target
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
        const { error } = this.state
        return(
            <div className="RegistrationPage">
                <h1 className="create-account-title">Create a Nom Nom Account</h1>
                <form onSubmit={this.handleSubmit}>
                    <div role='alert'>
                       { error && <p className='red'>{error}</p> }
                    </div>    
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
                    <input type='text' name='password' id='register_password' required/><br/>
                    
                    <button className="create-account-button" type="submit">Create account</button>
                </form>
            </div>
        )
    }
}


export default RegistrationPage;