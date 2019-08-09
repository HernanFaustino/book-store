import  React, { Component } from  'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import HomePage from './HomePage/HomePage';

import { PrivateRoute } from './PrivateRoute';
import './App.css';

class App extends Component {
    /*
    The main app component.
    Only /login and /register are public, the other routers
    are PrivateRoute wich will be redirected to /login if a user is not
    authenticated.
    */

    render() {
        return (
          
           <div className="">
                <div className="container">
                    <Router>
                        <div>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <PrivateRoute exact path="/" component={HomePage} />
                            <PrivateRoute exact path="/book/" component={HomePage} />
                            <PrivateRoute  path="/book/:pk"  component={HomePage} />
                        </div>
                    </Router>
                </div>
            </div>            
        );
    }
}

export default App;
