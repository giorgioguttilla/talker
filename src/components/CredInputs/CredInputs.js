import React, {Component} from 'react'; 
import './CredInputs.css';
import * as LoginUtils from '../../components/LoginUtils/LoginUtils';


//https://www.tutorialspoint.com/react_native/react_native_text_input.htm
class CredInputs extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            username: '',
            password: ''
        };
    }

    updateEmail = (event) => {
        this.setState({email: event.target.value});
    }
    updateUsername = (event) => {
        this.setState({username: event.target.value});
    }
    updatePassword = (event) => {
        this.setState({password: event.target.value});
    }

    login = () => {
        LoginUtils.doLogin(this.state.username, this.state.password);
        //console.log(this.state.username+this.state.password+'login');
    }
    register = () => {
        LoginUtils.doRegister(this.state.email, this.state.username, this.state.password);
        //console.log(this.state.username+this.state.password+'register');
    }
    render(){
        return(
            <div className='parent'>
                <br></br>
                <form>
                    <label className='emailField'>
                        <input type='text' placeholder="Email" value={this.state.email} onChange={this.updateEmail} />
                    </label>

                    <label className='usernameField'>
                        <input type='text' placeholder="Username" value={this.state.username} onChange={this.updateUsername} />
                    </label>

                    <label className='passwordField'>
                        <input type='password' placeholder="Password" value={this.state.password} onChange={this.updatePassword} />
                    </label>
                </form>
                
                <button onClick={this.login}>
                Login
                </button>

                <button onClick={this.register}>
                Register
                </button>                
            </div>
        );
    }
}

export default CredInputs;