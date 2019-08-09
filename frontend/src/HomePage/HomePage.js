import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import BookCreateUpdate from './BookCreateUpdate';
import BookList from './BookList';
import BaseHeader from './BaseHeader';


import AuthenticationService from '../Services/AuthenticationService'

const authenticationService = new AuthenticationService();

/**
 * HomePage component wich contains the bookslist, creation, update component
 */

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        if (localStorage.getItem('user')) {
            // if logged, set the state
            this.setState({ 
                user: JSON.parse(localStorage.getItem('user'))
            });
        } else {
            //if not logged regidrect to login page
            const { from } = this.props.location.state || { from: { pathname: "/login" } };
            this.props.history.push(from);
        }
    }

    render() {
        const { user } = this.state;
        return (
                <div className="main">
                    <BrowserRouter>
                        <BaseHeader/>
                        <Switch>
                            <Route  exact path="/" component={BookList} />
                            <Route  exact path="/book/" component={BookCreateUpdate} />
                            <Route  path="/book/:pk"  component={BookCreateUpdate} />
                        </Switch>
                    </BrowserRouter>
                </div>
        );
    }
}

export default HomePage;