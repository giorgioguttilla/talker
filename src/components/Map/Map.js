import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class WorldMap extends Component {
  constructor(){
      super();
      this.state = {}
      /*this.state = {
          //lat: 50.0,
          //lng: 50.0,
          zoom: 11,
          loading: true
      };*/
  }
  
  componentDidMount() {
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(this.getPos);
      }
  }

  getPos = (pos) => {
    this.setState({lat: pos.coords.latitude});
    this.setState({lng: pos.coords.longitude});
    console.log(pos.coords.latitude);
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

            </GoogleMapReact>
        </div>

        );
    }
    return <div> Loading... </div>;
  }
}
 
export default WorldMap;