import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';

//buttonInfo is what is inside the button you press

class Dropdown extends Component {
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        this.state = {
            down: false
        };
    }

    clickHandler(){
        this.setState({down: !this.state.down});
        console.log(this.state.down);
    }

    render(){

        var cn = '';

        if(this.state.down){
            cn = 'dropdownMenuOpen';
        } else {
            cn = 'dropdownMenuClosed';
        }
        //swaps between null and info, useless with css styling
        /*
        return(
            <span className='dropdownWhole'>
                <button onClick={this.clickHandler}>
                    {this.props.buttonInfo}
                </button>

                {this.state.down ? (
                    <div className={cn}>
                        {this.props.menu}
                    </div>
                ): null}
            </span>
        );
        */
        return (
            <span className='dropdownWhole'>
                <button onClick={this.clickHandler}>
                    {this.props.buttonInfo}
                </button>

                
                <div className={cn}>
                    {this.props.menu}
                </div>
            </span>
        );
    }
}

export default Dropdown;