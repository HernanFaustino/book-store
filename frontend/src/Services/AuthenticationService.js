import axios from 'axios';

//TODO: save API_URL in a env file o setting file
const API_URL = 'http://localhost:8000';
/**
 * Authentication service to Login, logout and register users.
 * AXios module is used to perform the http requests.
 */
export default class AuthenticationService {
    constructor() {}

    login(username, password) {
        //login with username and password
        const url = `${API_URL}/api/rest-auth/login/`;
        const requestOptions = {
            method: 'post',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: { 
                username: username, 
                password: password
            }
        };

        return axios(requestOptions)
            .catch(this.handleResponse) // if there are errors
            .then(data => {             // if correct response
                if (data) {
                    data.authdata = window.btoa(username + ':' + password);
                    data.username = username;
                    data.token = data.data.key;
                    localStorage.setItem('user', JSON.stringify(data));
                }
                return data;
            });
    }

    register(username, email, password1, password2) {
        // Register with username, email, password and password confirmation
        const url = `${API_URL}/api/rest-auth/registration/`;
        const requestOptions = {
            method: 'post',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: {
                username: username,
                email: email,
                password1: password1,
                password2: password2
            }
        };

        return axios(requestOptions)
            .catch(this.handleResponse) // When Error
            .then(data => {             // When ok  
                if (data) {
                    data.authdata = window.btoa(username + ':' + password1);
                    data.username = username;
                    data.token = data.data.key;
                    localStorage.setItem('user', JSON.stringify(data));
                }

                return data;
            });
    }

    getCurrectUser() {
        // Get the currect user saved in local stoage
        return JSON.parse(localStorage.getItem('user'));
    }
    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        window.location.reload(true);
    }

    handleResponse(response) {
        if (!response.statusText === "OK") {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                this.logout();
            }
            const data = response;

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return Promise.reject(response.response);
    }
}