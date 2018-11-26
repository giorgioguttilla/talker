import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import UserMarker from '../UserMarker/UserMarker';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class WorldMap extends Component {
  constructor(){
      super();
      this.state = {}
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
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.getPos, this.error, this.options);
    }
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
            <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text={'Kreyser Avrora'}
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