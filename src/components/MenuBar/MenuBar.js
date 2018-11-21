import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import './MenuBar.css'

class MenuBar extends Component {
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
        if(!firebase.auth().currentUser){
            return <Redirect to='/'/>
        } else if (this.state.redirect === '/'){
            return <Redirect to='/'/>
        } else {
            return (
                <div className='bar'>
                    <button className='logout' onClick={this.logOut}>
                        Log Out
                    </button>
                    


                    <span className='userButton'>
                        <img className='profilePic' src={require('../../assets/m7QiQ.png')}></img>
                        {firebase.auth().currentUser.displayName}
                    </span>

                    <span className='logoMP'>
                        talker
                    </span>
                </div>
            );
        }
    }
}

export default withRouter(MenuBar);

