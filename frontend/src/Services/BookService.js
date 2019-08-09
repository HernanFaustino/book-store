import axios from 'axios';
import AuthenticationService from './AuthenticationService';

const authenticationService = new AuthenticationService();

//TODO: save API_URL in a env file o setting file
const API_URL = 'http://localhost:8000';

axios.defaults.trailingSlash = true;

/**
 * Authentication service to Login, logout and register users.
 * AXios module is used to perform the http requests.
 */
export default class BookService {
    constructor() {}

    getBooks() {
        // Get all the books saved
        const url = `${API_URL}/api/books/`;
        const currentUser = authenticationService.getCurrectUser();
        const requestOptions = {
            method: 'get',
            url: url,   
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${currentUser.token}`},
        };
        return axios(requestOptions).then(response => response.data);
    }

    getBooksByURL(link) {
        // GEt books with link for search and filter queries.
        const url = `${link}`;
        const currentUser = authenticationService.getCurrectUser();
        const requestOptions = {
            method: 'get',
            url: url,   
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${currentUser.token}`},
        };
        return axios(requestOptions).then(response => response.data);
    }

    getBook(pk) {
        // GEt a book by primary key
        const url = `${API_URL}/api/books/${pk}`;
        const currentUser = authenticationService.getCurrectUser();
        const requestOptions = {
            method: 'get',
            url: url,   
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${currentUser.token}`}
        };
        return axios(requestOptions).then(response => response.data);
    }

    deleteBook(book) {
        // Delete a book
        const url = `${API_URL}/api/books/${book.pk}`;
        const currentUser = authenticationService.getCurrectUser();
        const requestOptions = {
            method: 'delete',
            url: url,   
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${currentUser.token}`},
        };
        return axios(requestOptions);
    }

    createBook(book) {
        // Creeate a book
        const url = `${API_URL}/api/books/`;
        const currentUser = authenticationService.getCurrectUser();
        const form = new FormData();

        for (var key in book) {
            form.append(key, book[key]);
        }
        const requestOptions = {
            method: 'post',
            url: url,   
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${currentUser.token}`},
            data: form,
            mimeType: "multipart/form-data", // important to send files
            processData: false,
            contentType: false,
        };
        return axios(requestOptions)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response);
            return Promise.reject(error);
        });
    }

    updateBook(book) {
        // Update a book
        const url = `${API_URL}/api/books/${book.pk}`;
        const currentUser = authenticationService.getCurrectUser();
        const form = new FormData();

        for (var key in book) {
            if (book[key]) {
                form.append(key, book[key]);
            }
        }
        const requestOptions = {
            method: 'put',
            url: url,   
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${currentUser.token}`},
            data: form,
            mimeType: "multipart/form-data",
            processData: false,
            contentType: false,
        };
        return axios(requestOptions)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.response);
                return Promise.reject(error);
            });;
    }
}