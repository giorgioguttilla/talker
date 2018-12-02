import React, {Component} from 'react'; 
import * as firebase from 'firebase';
import './Post.css';

//var zadd = 11;

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            score: this.props.score
        }
    }

    //this whole mess sets the state of the post before rendering so upvotes and downvoutes show
    componentWillMount(){
        var user = firebase.auth().currentUser;
        firebase.database().ref('posts/' + this.props.$dimensionKey + '/voted').once('value').then((snapshot) => {
            console.log(snapshot.val());
            if(snapshot.val()[user.uid] === 'up'){
                this.setState({upOn: true});
            }
            if(snapshot.val()[user.uid] === 'down'){
                this.setState({downOn: true});
            }
        });
    }

    //voting procedures, updates score and list of who voted on post but after making sure person is eligible to vote
    //no idea why but the key of this post is $dimensionKey
    upvote = () =>{
        var userid = firebase.auth().currentUser.uid;


        firebase.database().ref('posts/' + this.props.$dimensionKey + '/voted').once('value').then((snapshot) => {
            
            if(snapshot.val()[userid] === 'up'){    //already voted up

                console.log('cant double vote');

            } else if(snapshot.val()[userid] === 'down'){   //voted down
                firebase.database().ref('posts/' + this.props.$dimensionKey + '/score').transaction((thisScore) => {
            
                    this.setState({score: this.state.score + 2});
                    return thisScore + 2;
                }).then(() => {
        
                });
        
                firebase.database().ref('posts/' + this.props.$dimensionKey + '/voted').transaction((votedList) => {
                    votedList[userid] = 'up';
                    return votedList;
                });
            } else {    //did not vote yet
                firebase.database().ref('posts/' + this.props.$dimensionKey + '/score').transaction((thisScore) => {
            
                    this.setState({score: this.state.score + 1});
                    return thisScore + 1;
                }).then(() => {
        
                });
        
                firebase.database().ref('posts/' + this.props.$dimensionKey + '/voted').transaction((votedList) => {
                    votedList[userid] = 'up';
                    return votedList;
                });
            }

            this.setState({upOn: true});
            this.setState({downOn: false});
        });
    }

    

    downvote = () =>{
        var userid = firebase.auth().currentUser.uid;

        console.log(this.props.text);
        console.log(this.props.$dimensionKey);
        
        firebase.database().ref('posts/' + this.props.$dimensionKey + '/voted').once('value').then((snapshot) => {
            
            if(snapshot.val()[userid] === 'down'){    //already voted down

                console.log('cant double vote');

            } else if(snapshot.val()[userid] === 'up'){   //voted down
                firebase.database().ref('posts/' + this.props.$dimensionKey + '/score').transaction((thisScore) => {
            
                    this.setState({score: this.state.score - 2});
                    return thisScore - 2;
                }).then(() => {
        
                });
        
                firebase.database().ref('posts/' + this.props.$dimensionKey + '/voted').transaction((votedList) => {
                    votedList[userid] = 'down';
                    return votedList;
                });
            } else {    //did not vote yet
                firebase.database().ref('posts/' + this.props.$dimensionKey + '/score').transaction((thisScore) => {
            
                    this.setState({score: this.state.score - 1});
                    return thisScore - 1;
                }).then(() => {
        
                });
        
                firebase.database().ref('posts/' + this.props.$dimensionKey + '/voted').transaction((votedList) => {
                    votedList[userid] = 'down';
                    return votedList;
                });
            }

            this.setState({upOn: false});
            this.setState({downOn: true});
        });
    }

    bringToFront = (e) => {
        e.target.setAttribute('style', 'z-index: ' + (window.zadd++));
        console.log(e.target);
        //centers the parent map on this post
        let x = {lat: this.props.lat, lng: this.props.lng}
        this.props.centerMap(x);
    }

   

    render(){
        return (
            <div className="post" onClick={this.bringToFront}>
                <span className='namemessage'>
                    {this.props.username}
                    <br></br>
                    {this.props.text}
                </span>
                
                <span className='score'>
                    {this.state.score}
                    <span>
                        <div>
                            <button className={this.state.upOn ? 'uon' : 'uoff'} onClick={this.upvote}>^</button>
                        </div>
                        <div>
                            <button className={this.state.downOn ? 'don' : 'doff'} onClick={this.downvote}>v</button>
                        </div>
                    </span>
                </span>
            </div>
        );
    }
}

export default Post;