import React, {Component} from 'react'; 
import WorldMap from '../../components/Map/Map';
import { withRouter, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import MenuBar from '../../components/MenuBar/MenuBar';
import MouseTracker from '../../components/MouseTracker/MouseTracker';







class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            z: 11
        }
    }

    //not working currently
    getInnermostHovered = () => {
        var n = document.querySelector(":hover");
        var nn;
        while (n) {
            nn = n;
            n = nn.querySelector(":hover");
        }
        console.log(nn);
        //nn.setAttribute('style', 'z-index: ' + this.state.z);
        //this.setState({z: this.state.z++});
    }

    render(){
        //redirects back to login if nobody is signed in
        return(
            <div> 
                <MenuBar />

                
                <WorldMap />
            </div>
        );
    }
}

export default withRouter(MainPage);