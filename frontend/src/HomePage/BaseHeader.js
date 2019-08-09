import React, { Component } from 'react';
import AuthenticationService from '../Services/AuthenticationService';
import { Link } from 'react-router-dom';

const authenticationService = new AuthenticationService();

/**
 * BaseHeader will be the navbar in the application, wich 
 * will have the links, username, and logout items.
 */
class BaseHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: ""
        };

        this.logout = this.logout.bind(this);

    }

    componentDidMount() {
        // Set the logged user in the state
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user'))
        });
    }

    logout() {
        //logout from the aplication
        authenticationService.logout(); 
    }


    render() {
        const user = this.state.user;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Demo Bookt Store</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-item nav-link">BOOKS</Link>
                                  </li>
                                  <li className="nav-item">
                                <Link to="/book" className="nav-item nav-link">CREATE BOOK</Link>    
                            </li>
                        </ul>
                        { user &&
                            <button type="button" className="btn btn-light">
                            {user.username}
                            </button>
                        }
                        <button onClick={(e)=> this.logout()} className={'btn btn-link'}>Logout</button>
                    </div>
                </nav>
            </div>

        );
    }
}

export default BaseHeader;