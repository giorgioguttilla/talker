import React, {Component} from 'react'; 
import WorldMap from '../../components/Map/Map';
import { withRouter, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';





class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: ''
        };
    }


    logOut = () => {
        var thisMP = this;

        firebase.auth().signOut().then(
            thisMP.setState({redirect: '/'})
        );
    }

    render(){

        //redirects back to login if nobody is signed in
        if(!firebase.auth().currentUser){
            return <Redirect to='/'/>
        } else if (this.state.redirect === '/'){
            return <Redirect to='/'/>
        } else {
            return(
                <div> 
                    <button onClick={this.logOut}>
                        Log Out
                    </button>
                    <WorldMap />
                </div>
            );
        } 
    }
}

export default withRouter(MainPage);