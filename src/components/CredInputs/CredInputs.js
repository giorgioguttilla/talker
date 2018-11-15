import React, {Component} from 'react'; 
import './CredInputs.css';

//https://www.tutorialspoint.com/react_native/react_native_text_input.htm
class CredInputs extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }


    updateUsername = (event) => {
        this.setState({username: event.target.value});
    }
    updatePassword = (event) => {
        this.setState({password: event.target.value});
    }
    login = () => {
        console.log(this.state.username+this.state.password+'login');
    }
    register = () => {
        console.log(this.state.username+this.state.password+'register');
    }
    render(){
        return(
            <div className='parent'>
                <br></br>
                <form>
                    <label className='usernameField'>
                        <input type='text' placeholder="Username" value={this.state.username} onChange={this.updateUsername} />
                    </label>

                    <label className='passwordField'>
                        <input type='text' placeholder="Password" value={this.state.password} onChange={this.updatePassword} />
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