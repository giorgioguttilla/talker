import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';

//buttonInfo is what is inside the button you press

class Dropdown extends Component {
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        this.state = {
            down: true
        };
    }

    clickHandler(){
        this.setState({down: !this.state.down});
        console.log(this.state.down);
    }

    render(){
        return(
            <div className='dropdown'>
                <button onClick={this.clickHandler}>
                    {this.props.buttonInfo}
                </button>

                {this.state.down ? (
                    <div>
                        CONTENTS
                    </div>
                ): null}
            </div>
        );
    }
}

export default Dropdown;