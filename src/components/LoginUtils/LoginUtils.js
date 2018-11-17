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





export function doLogin(username, password){
    return null;
}

export function doRegister(username, password){
    
    return null;
}