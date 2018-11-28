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
        console.log(this.state.commentText);
        
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