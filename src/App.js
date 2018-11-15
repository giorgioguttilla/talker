import React from 'react'; 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoginPage from './routes/LoginPage/LoginPage.js';
import MainPage from './routes/MainPage/MainPage.js';


const MainMenu = () => {
    return (
        <div>
          <Link to="/">
            <button>Login</button>
          </Link>
          <Link to="/mainpage">
            <button>Main</button>
          </Link>
        </div>
    ); 
};


class App extends React.Component {
    render(){
        return(
            <Router>
                <div>
                <MainMenu />
                
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/mainpage" component={MainPage} />
                </div>
            </Router>
        );
    }
}

export default App;