import React, {Component} from 'react'; 
import './LoginPage.css';
import CredInputs from '../../components/CredInputs/CredInputs'

class LoginPage extends Component {


    render(){
        return(
            <div> 
                <div className='box'>

                    <div className='logo'>
                    <span>talker</span>
                    </div>

                    <CredInputs />

                </div>
            </div>
        );
    }
}

export default LoginPage;