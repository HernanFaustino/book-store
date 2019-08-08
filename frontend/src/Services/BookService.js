import axios from 'axios';
import AuthenticationService from './AuthenticationService';

const authenticationService = new AuthenticationService();
const API_URL = 'http://localhost:8000';

export default class BookService {
    constructor() {}

    getBooks() {
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
        const url = `${API_URL}${link}`;
        const currentUser = authenticationService.getCurrectUser();
        const requestOptions = {
            method: 'get',
            url: url,   
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${currentUser.token}`},
        };
        return axios(requestOptions).then(response => response.data);
    }

    getBook(pk) {
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
            mimeType: "multipart/form-data",
            processData: false,
            contentType: false,
        };
        console.log(book);
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
        console.log(book);
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