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


export function doLogin(email, password){

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error.code);
    });
}


export function doRegister(email, disp, password){

    firebase.auth().createUserWithEmailAndPassword(email, password).then(
        function() {

            var user = firebase.auth().currentUser;

            user.updateProfile({displayName: disp, photoURL: null});
            
        
        }).catch(function(error){
            console.log(error.code);
            console.log(error.message);
    });
}


export function isLoggedIn(){

    var user = firebase.auth().currentUser;

    if (user) {
        return true;
    } else {
        return false;
    }
}