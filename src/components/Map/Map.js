import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import UserMarker from '../UserMarker/UserMarker';
import Post from '../Post/Post'
import * as firebase from 'firebase';
import MouseTracker from '../MouseTracker/MouseTracker';
 




//listens for post change


if(firebase.apps.length){
    var ref = firebase.database().ref('posts');
    ref.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
            console.log(childSnapshot.key);
        });
    });
}

//var pl = [];

class WorldMap extends Component {
    constructor(){
        super();
        this.state = {
            pl: []
        }
        this.getPos.bind(this);
    }
    
    options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    }

    

    getPos = (pos) => {
        this.setState({lat: pos.coords.latitude});
        this.setState({lng: pos.coords.longitude});
        console.log(pos);
    }
    
    error = (err) => {
        console.warn("oops gps fugged up");
    }

    componentDidMount() {
        var thisDM = this;

        //need to do something with cookies to make this more accurate
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getPos, this.error, this.options);
        }

        // //gets all posts and displays them on the map
        // let allposts = [];
        // firebase.database().ref('posts').once('value').then((snapshot) => {
        //     snapshot.forEach(function(childSnapshot){
        //         allposts.push({
        //             lat: childSnapshot.val().lat,
        //             lng: childSnapshot.val().lng,
        //             username: childSnapshot.val().author,
        //             text: childSnapshot.val().text,
        //             score: childSnapshot.val().score
        //         });

        //     });
        //     this.setState({pl: allposts});
        // });
        //gets all posts and displays them on the map
        
        firebase.database().ref('posts').on('value', (snapshot) => {
            let allposts = [];
            snapshot.forEach(function(childSnapshot){
                allposts.push({
                    lat: childSnapshot.val().lat,
                    lng: childSnapshot.val().lng,
                    username: childSnapshot.val().author,
                    text: childSnapshot.val().text,
                    score: childSnapshot.val().score,
                    key: childSnapshot.key
                });

            });
            this.setState({pl: allposts});
        });
        
    }  

    
    // bringToFront = () => {
    //     console.log('this.state.text');
    // }


    render() {
        //puts posts into an encapsulated post object
        const renderPosts = () => this.state.pl.map((cs) => {
            console.log(cs.key);
            return (
                <Post    
                    lat={cs.lat}// + Math.random() * 0.0001}
                    lng={cs.lng}// + Math.random() * 0.0001}
                    username={cs.username}
                    text={cs.text}
                    score={cs.score}
                    key={cs.key}
                    //experimental
                    //onClick={this.bringToFront}
                />    
            );
        })
        console.log("map state: ", this.state);
        
       
        
        if(this.state.lng){
            console.log(this.state.pl);
            return (
                
            
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>

                <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCG1E70cgsFeSnoOkR738YzSKY5e2qX0iA'}}
                defaultCenter={{lat: this.state.lat, lng: this.state.lng}}
                defaultZoom={18}
                >

                
                
                {renderPosts()}
                
                

                <UserMarker 
                    lat={this.state.lat}
                    lng={this.state.lng}
                />


                </GoogleMapReact>
            </div>

            );
        }
        return <div> Loading... </div>;
    }
}
 
export default WorldMap;