import React from 'react'; 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoginPage from './routes/LoginPage/LoginPage.js';
import MainPage from './routes/MainPage/MainPage.js';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDuj5ss98jV7FP44jjH5lYKFFqijxcVASg",
    authDomain: "talker-60940.firebaseapp.com",
    databaseURL: "https://talker-60940.firebaseio.com",
    projectId: "talker-60940",
    storageBucket: "talker-60940.appspot.com",
    messagingSenderId: "549959146973"
};

firebase.initializeApp(config);

var database = firebase.database();

//updates relevant information when user changes

var username, uid;

firebase.auth().onAuthStateChanged(function(user){
    if(user != null){
        username = user.displayName;
        uid = user.uid;

        console.log(username);
        console.log(uid);
        console.log(user.email);
    } else {

    }
});


/*
const MainMenu = () => {
    return (
        <div>
          <Link to="/">
            <button>Login</button>
          </Link>
          <Link to="/mainpage">
            <button>Main</button>
          </Link>
        </div>
    ); 
};
*/

class App extends React.Component {
    render(){
        return(
            <Router>
                <div>
                
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/mainpage" component={MainPage} />
                </div>
            </Router>
        );
    }
}

export default App;