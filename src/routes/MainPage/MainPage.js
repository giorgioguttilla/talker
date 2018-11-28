import React, {Component} from 'react'; 
import WorldMap from '../../components/Map/Map';
import { withRouter, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import MenuBar from '../../components/MenuBar/MenuBar';




class MainPage extends Component {
    constructor(props){
        super(props);

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