import React, { Component } from 'react';
import AuthenticationService from '../Services/AuthenticationService';

const authenticationService = new AuthenticationService();

class BaseHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: ""
        };

        this.logout = this.logout.bind(this);

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
        const user = this.state.user;
        return (
            <div>
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">Demo Books Store</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        { user &&
                            <div>
                                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                    <div className="navbar-nav">
                                      <a className="nav-item nav-link" href="/">BOOKS</a>
                                      <a className="nav-item nav-link" href="/book">CREATE BOOK</a>              
                                    </div>
                                    <button onClick={(e)=> this.logout()}>Logout</button>
                                </div>
                            </div>
                        }
                    </nav>  
                </div>
            </div>

        );
    }
}

export default BaseHeader;