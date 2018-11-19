import React, {Component} from 'react'; 
import './CredInputs.css';
//import * as LoginUtils from '../../components/LoginUtils/LoginUtils';
import { withRouter, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';



//https://www.tutorialspoint.com/react_native/react_native_text_input.htm
class CredInputs extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            showLogin: true,
            redirect: ''
        };
    }

    
    //functions that update information as you type it, take you to the login page/register page
    updateEmail = (event) => {
        this.setState({email: event.target.value});
    }
    updateUsername = (event) => {
        this.setState({username: event.target.value});
    }
    updatePassword = (event) => {
        this.setState({password: event.target.value});
    }
    toLogin = () => {
        this.setState({showLogin: true});
    }
    toRegister = () => {
        this.setState({showLogin: false});
    }

    //creates a new user with firebase and asynchronously loads the mainpage after it completes
    login = () => {
        var thisCI = this;

        console.log(this.state.redirect);

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
        
            (user) => {
                if(user){

                    console.log("ffff!");
                    console.log(user);

                    thisCI.setState({redirect: '/mainpage'}, () => {
                        console.log(thisCI.state.redirect);
                    });
                    
                }
            }
    
        ).catch(function(error) {
            if(error){
                console.log(error.code);
            }
        });
    }


    register = () => {
        var thisCI = this;


        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(
            function() {
    
                var user = firebase.auth().currentUser;
    
                user.updateProfile({displayName: thisCI.state.username, photoURL: null});
                
                console.log('thisworks');
    
                thisCI.setState({redirect: '/mainpage'}, () => {
                    console.log(thisCI.state.redirect);
                });
            
            }).catch(function(error){
                console.log(error.code);
                console.log(error.message);
        });
    }

    //if redirect has been initialized, do one, otherwise display appropriate information
    render(){
        if(this.state.redirect !== ''){
            return <Redirect to={this.state.redirect}/>;
        }
        if(this.state.showLogin){
            return(
                <div className='parent'>
                    <div className='header'>LOGIN</div>
                    <br></br>
                    <form>
                        <label className='emailField'>
                            <input type='text' placeholder="Email" value={this.state.email} onChange={this.updateEmail} />
                        </label>
    
                        <label className='passwordField'>
                            <input type='password' placeholder="Password" value={this.state.password} onChange={this.updatePassword} />
                        </label>
                    </form>
                    
                    <button onClick={this.login}>
                    Login
                    </button>
    
                    <button onClick={this.toRegister}>
                    New user? Register here
                    </button> 

                    

                </div>
            );
        } else {
            return(
                <div className='parent'>
                    <div className='header'>REGISTER</div>
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
                    
                    <button onClick={this.toLogin}>
                    Already a user? Login here
                    </button>
    
                    <button onClick={this.register}>
                    Register
                    </button>                
                </div>
            );
        }

        
    }
    
}

//needs to be exported as such for router to work
export default withRouter(CredInputs);