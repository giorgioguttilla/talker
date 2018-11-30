import React, {Component} from 'react'; 
import './UserMarker.css'
import * as firebase from 'firebase';

const Marker = (
    <div className='markerDot'>
        
    </div>
)

class UserMarker extends Component {
    constructor(props){
        super(props);
        this.state = {
            canPost: true,
            commentText: '',
            upl: []
        }
    }

    //should calculate the distance between the user and all their posts and
    //if too close on any of them then prevent from posting
    // componentDidMount(){


    //     //gets all the posts by the user and stores them for when we need to test proximity
    //     firebase.auth().onAuthStateChanged((user) => {

    //         let userPosts = [];
    //         firebase.database().ref('user-posts/' + user.uid).once('value').then((snapshot) => {
    //             snapshot.forEach(function(childSnapshot){
    //                 userPosts.push({
    //                     lat: childSnapshot.val().lat,
    //                     lng: childSnapshot.val().lng
    //                 });

    //             });
    //             //will pass this into user marker
    //             this.setState({upl: userPosts});
    //         });
    //     })


    //     var proxTest = true;

    //     this.interval = setInterval(() => {

    //         this.state.upl.forEach((coords) => {
    //             var dist = //distance formula
    //             Math.abs(
    //                 Math.sqrt(
    //                     Math.pow(
    //                         (this.props.lat - coords.lat), 2
    //                     ) + 
    //                     Math.pow(
    //                         (this.props.lng - coords.lng), 2
    //                     )
    //                 )
    //             );

    //             if(dist < 0.01){
    //                 console.log(dist);
    //                 proxTest = false;
    //             }
    //         });

    //         this.setState({canPost: proxTest});

    //     }, 10000);
    // }


    

    doPost = () => {
        

        //https://firebase.google.com/docs/database/web/read-and-write
        //get user
        var user = firebase.auth().currentUser;

        var vtd = {};
        vtd[user.uid] = 'up';

        //consolidate post data, gets lat and lng from props
        var data = {
            author: user.displayName,
            uid: user.uid,
            text: this.state.commentText,
            score: 1,
            lat: this.props.lat,
            lng: this.props.lng,
            timestamp: new Date().getTime(),
            voted: vtd
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

    bringToFront = (e) => {
        e.target.setAttribute('style', 'z-index: ' + (window.zadd++));
        console.log(e.target);
    }

    render(){
        if(this.state.canPost){
            return(
            <div onClick={this.bringToFront}>
                
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
        } else {
            return(
                <div>
                    need to be further from other posts to post
                    {Marker}
                </div>
            );
        }
    }
}

export default UserMarker