import React, {Component} from 'react'; 
import WorldMap from '../../components/Map/Map';
import { withRouter, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import MenuBar from '../../components/MenuBar/MenuBar';







class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    //deletes old posts when you log back in
    componentWillMount(){
        //https://stackoverflow.com/questions/13838441/javascript-how-to-calculate-the-date-that-is-2-days-ago
        var datenow = new Date();
        var cutoffdate = datenow - 1000 * 60 * 60 * 24;
        cutoffdate = new Date(cutoffdate);
        console.log(cutoffdate);
        console.log(datenow);
        
    }

    // //not working currently
    // getInnermostHovered = () => {
    //     var n = document.querySelector(":hover");
    //     var nn;
    //     while (n) {
    //         nn = n;
    //         n = nn.querySelector(":hover");
    //     }
    //     console.log(nn);
    //     //nn.setAttribute('style', 'z-index: ' + this.state.z);
    //     //this.setState({z: this.state.z++});
    // }

    render(){
        //redirects back to login if nobody is signed in
        return(
            <div> 
                <MenuBar />

                
                <WorldMap />
            </div>
        );
    }
}

export default withRouter(MainPage);