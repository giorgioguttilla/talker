import React, {Component} from 'react'; 
import WorldMap from '../../components/Map/Map';
import { withRouter, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';

const Menu = () => {
    return(
        null
    );
};

class MainPage extends Component {
    
    render(){

        //redirects back to login if nobody is signed in
        if(!firebase.auth().currentUser){
            return <Redirect to='/'/>
        } else {
            return(
                <div> 
                    <WorldMap />
                </div>
            );
        } 
    }
}

export default withRouter(MainPage);