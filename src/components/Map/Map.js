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

var pl = [];


class WorldMap extends Component {
    constructor(){
        super();
        this.state = {

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

    //need to do something with cookies to make this more accurate
    componentDidMount() {
        var thisDM = this;

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getPos, this.error, this.options);
        }

        //this does not work
        var ref = firebase.database().ref('posts');
        ref.on('value', function(snapshot){
            snapshot.forEach(function(childSnapshot){
                pl[childSnapshot.key] = 
                (<Post>    
                    lat={childSnapshot.lat}
                    lng={childSnapshot.lng}
                    user={childSnapshot.user}
                    text={childSnapshot.text}
                    score={childSnapshot.score}
                </Post>);
            });
            console.log(pl);
        });
    }

    
    


    render() {

        if(this.state.lng){
            return (
            
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCG1E70cgsFeSnoOkR738YzSKY5e2qX0iA'}}
                defaultCenter={{lat: this.state.lat, lng: this.state.lng}}
                defaultZoom={18}
                >

                <Post
                    lat={39}
                    lng={-90}
                    user={{displayName: 'paul'}}
                    text='this is a test post my guy. asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf'
                    score='127'
                />
                

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