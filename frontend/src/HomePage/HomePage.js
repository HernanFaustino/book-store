import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import BookCreateUpdate from './BookCreateUpdate';
import BookList from './BookList';
import BaseHeader from './BaseHeader';
import { PrivateRoute } from '../PrivateRoute';


import AuthenticationService from '../Services/AuthenticationService'

const authenticationService = new AuthenticationService();

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user'))
        });
    }

    logout() {
        authenticationService.logout();
    }

    render() {
        const { user } = this.state;
        return (
                <div className="main">
                    <BaseHeader/>
                    <BrowserRouter>
                        <Switch>
                            <Route  exact path="/" component={BookList} />
                            <Route  exact path="/book/" component={BookCreateUpdate} />
                            <Route  exact path="/book/:pk"  component={BookCreateUpdate} />
                        </Switch>
                    </BrowserRouter>
                </div>
        );
    }
}

export default HomePage;