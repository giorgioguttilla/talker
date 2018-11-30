import React, { Component } from 'react';


//https://stackoverflow.com/questions/42182481/getting-mouse-coordinates-in-react
class MouseTracker extends Component {
    constructor(props) {
        super(props);
    
        this.state = { 
            x: 0, 
            y: 0 
        };
    }
  
    _onMouseMove(e) {
        this.setState({ x: e.pageX, y: e.pageY });
    }
    render() {
        const { x, y } = this.state;
        return <div style={{zIndex:10000, width:'100vw', height:'100vh'}} onMouseMove={this._onMouseMove.bind(this)}>
            <h1>Mouse coordinates: { x } { y }</h1>
        </div>;
    }

    
}

export default MouseTracker;