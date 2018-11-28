import React, {Component} from 'react'; 
import './UserMarker.css'
import * as firebase from 'firebase';

const Marker = (
    <div className='markerDot'>
        
    </div>
)

class UserMarker extends Component {
    constructor(){
        super();
        this.state = {
            commentText: ''
        }
    }

    doPost = () => {

        //https://firebase.google.com/docs/database/web/read-and-write
        //get user
        var user = firebase.auth().currentUser;

        //consolidate post data, gets lat and lng from props
        var data = {
            author: user.displayName,
            uid: user.uid,
            text: this.state.commentText,
            score: 0,
            lat: this.props.lat,
            lng: this.props.lng,
            timestamp: new Date().getTime()
        }

        //get post key
        var newPostKey = firebase.database().ref().child('posts').push().key;
        
        //update info at post key
        var updates = {};
        updates['/posts/' + newPostKey] = data;
        updates['/user-posts/' + user.uid + '/' + newPostKey] = data;

        //applies updates
        firebase.database().ref().update(updates);
    }

    updateText = (event) => {
        this.setState({commentText: event.target.value});
    }

    render(){
        return(
            <div>
                
                <span className="postBox">
                    <div>Post a Comment</div>
                    <textarea rows='5' cols='40' placeholder="Max Chars: 200" maxLength='200'  value={this.state.commentText} onChange={this.updateText}></textarea>
                    <button onClick={this.doPost}>
                    Post
                    </button>
                </span>
                {Marker}

            </div>
        );
    }
}

export default UserMarker