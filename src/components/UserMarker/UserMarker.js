import React, {Component} from 'react'; 
import './UserMarker.css'

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
        console.log(this.state.commentText)
    }

    updateText = (event) => {
        this.setState({commentText: event.target.value});
    }

    render(){
        return(
            <div>
                
                <span className="postBox">
                    <div>Post a Comment</div>
                    <input type="text" placeholder="Max Chars: 200" value={this.state.commentText} onChange={this.updateText}></input>
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