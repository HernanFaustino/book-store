import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import AuthenticationService from '../Services/AuthenticationService';

const authenticationService = new AuthenticationService();

/**
 * Register page
 */

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: '',
            submitted: false,
            loading: false,
            error: ''
        };
        //TODO: redirect to home if already logged in
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {username, password1, password2, email} = this.state;

        // stop here if form is invalid
        if (!(username && email && password1 && password2)) {
            return;
        }

        this.setState({ loading: true });

        authenticationService.register(username, email, password1, password2)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => {
                    console.log(error);
                    var strError = error.data[[Object.keys(error.data)[0]]][0];
                    this.setState({ error: strError, loading: false });
                }
            );
    }

    render() {
        const { username, email, password1, password2, submitted, loading, error } = this.state;
        return (
            <div className={'register-form row justify-content-center align-items-center'}>
                <div className="col-4">
                    <form name="form" onSubmit={this.handleSubmit} className="form">
                        <h1>Register</h1>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                            <label htmlFor="username">Email</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
                            {submitted && !email &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password1 ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password1" value={password1} onChange={this.handleChange} />
                            {submitted && !password1 &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && !password2 ? ' has-error' : '')}>
                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" className="form-control" name="password2" value={password2} onChange={this.handleChange} />
                            {submitted && !password2 &&
                                <div className="help-block">Password confirmation is required</div>
                            }
                            {!submitted && password1 !== password2 &&
                                <div className="help-block">Your password and confirmation password do not match</div>
                            }
                            
                        </div>

                        <div className="form-group d-flex justify-content-between">
                            <button className="btn btn-primary" disabled={loading}>Register</button>
                            {loading &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <Link to="/login" ClassName={'register-link'}>back</Link>
                        </div>
                        {error &&
                            <div className={'alert alert-danger'}>{error}</div>
                        }
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterPage;