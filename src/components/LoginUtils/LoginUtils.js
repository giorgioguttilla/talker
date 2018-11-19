/*
import React, {Component} from 'react'; 
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MainPage from '../../routes/MainPage/MainPage.js';
import Redirect from 'react-router-dom/Redirect';


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


export async function doLogin(email, password){

    //window.location = '/mainpage';

    firebase.auth().signInWithEmailAndPassword(email, password).then(
        
        function(){

            var user = firebase.auth().currentUser;

            console.log("cool!");

            return 'logged';  
        }

    ).catch(function(error) {
        console.log(error.code);
        return 'not logged';
    });

}


export async function doRegister(email, disp, password){

    firebase.auth().createUserWithEmailAndPassword(email, password).then(
        function() {

            var user = firebase.auth().currentUser;

            user.updateProfile({displayName: disp, photoURL: null});
            
            console.log('thisworks');

            
        
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
*/