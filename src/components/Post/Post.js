import React, {Component} from 'react'; 
import './Post.css'


class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            score: this.props.score
        }
    }

    render(){
        return (
            <div className="post">
                <span className='namemessage'>
                    {this.props.user.displayName}
                    <br></br>
                    {this.props.text}
                </span>
                
                <span className='score'>
                    {this.state.score}
                    <span>
                        <div>
                            ^
                        </div>
                        <div>
                            v
                        </div>
                    </span>
                </span>
            </div>
        );
    }
}

export default Post;