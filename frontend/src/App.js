import  React, { Component } from  'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import HomePage from './HomePage/HomePage';

import { PrivateRoute } from './PrivateRoute';
import './App.css';

class App extends Component {

    render() {
        return (
           // <BrowserRouter>
           //    <BaseLayout/>
           // </BrowserRouter>
           <div className="jumbotron">
                <div className="container">
                    <Router>
                        <div>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route  exact path="/book/" component={HomePage} />
                            <Route  path="/book/:pk"  component={HomePage} />
                        </div>
                    </Router>
                </div>
            </div>            
        );
    }
}

export default App;
