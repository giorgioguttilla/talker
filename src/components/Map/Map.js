import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import UserMarker from '../UserMarker/UserMarker';
import Post from '../Post/Post'
import * as firebase from 'firebase';

 


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

        //gets all posts and displays them on the map
        let x = [];
        firebase.database().ref('posts').once('value').then((snapshot) => {
            snapshot.forEach(function(childSnapshot){
                x.push({
                    lat: childSnapshot.val().lat,
                    lng: childSnapshot.val().lng,
                    user: {displayName: 'def'},
                    text: childSnapshot.val().text,
                    score: childSnapshot.val().score
                });

            });
            this.setState({pl: x});
        });
    }  

    


    render() {
        const renderPosts = () => this.state.pl.map((cs) => {
            return (
                <Post    
                    lat={cs.lat + Math.random() * 0.001}
                    lng={cs.lng + Math.random() * 0.001}
                    user={cs.user}
                    text={cs.text}
                    score={cs.score}
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

                <Post
                    lat={41}
                    lng={-90}
                    user={{displayName: 'paul'}}
                    text='this is a test post my guy. asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf'
                    score='127'
                />
                
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