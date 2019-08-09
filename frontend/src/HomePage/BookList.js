import React, { Component } from 'react';
import BookService from '../Services/BookService';
import { Link } from 'react-router-dom';

const bookService = new BookService();
const API_URL = 'http://localhost:8000';

 //TODO: GET pagesize from the pagination in de backend
const PAGE_SIZE = 3;

/**
 * BookList component is the table wich contains all the books.
 * COntain the table, the paginator, the search inputs
 */
class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            nextPageURL: '',
            prevPageURL: '',
            exactMatch: false,
            titleFilter: '',
            yearFilter: '',
            search: false,
            pages: 0,
        };
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonSearchSubmit = this.handleButtonSearchSubmit.bind(this);
    }

    componentDidMount() {
        var self = this;
        bookService.getBooks().then(function(result) {
            self.setState({books: result.results, nextPageURL: result.next, "prevPageURL": result.previous, "pages": Math.ceil(result.count / PAGE_SIZE)})
        });
    }

    handleDelete(e, pk) {
        // Bookservice perform the deletion of a book
        var self = this;
        bookService.deleteBook({pk: pk}).then(() => {
            var newArr = self.state.books.filter(function(obj) {
                return obj.pk !== pk;
            });
            self.setState({books: newArr}) // The new books list is set in the state
        });
    }

    handleSearchChange(e) {
        // When in the general search input is typed something, bookservice perfomr this search
        var value = e.target.value;
        var searchUrl = "";
        if (value) {
            searchUrl =`${API_URL}/api/books/?search=${value}`; // The search url query if something is typed
            this.setState({search: value});
        } else {
            searchUrl =`${API_URL}/api/books/`; //the search url query with empty search form
            this.setState({search: ""});
        }
        var self = this;
        bookService.getBooksByURL(searchUrl).then((result) => {
            self.setState({books: result.results, nextPageURL: result.next, "prevPageURL": result.previous, "pages": Math.ceil(result.count / PAGE_SIZE)})
        });
    }

    handleChange(e) {
        /// Handle the change in the exact match search form
        const {name, value} = e.target;
        this.setState({ [name]: value });
    }

    handleChecked() {
        // handle the checkbox to check if its general search or exact match check
        this.setState({exactMatch: !this.state.exactMatch});
    }

    handleButtonSearchSubmit() {
        // handle the exact match search sumittion
        var strFilter = "";
        strFilter += this.state.titleFilter ? "?title=" + this.state.titleFilter : "";
        strFilter += this.state.yearFilter ? "&publication_year=" + this.state.yearFilter : ""
        
        const searchUrl = strFilter ? `${API_URL}/api/books/` + strFilter : `${API_URL}/api/books/`;
        var self = this;
        bookService.getBooksByURL(searchUrl).then((result) => {
            self.setState({books: result.results, nextPageURL: result.next, "prevPageURL": result.previous, "pages": Math.ceil(result.count / PAGE_SIZE)})
        });
    }

    nextPage() {
        // handle when next page button is clicked
        if (this.state.nextPageURL) {
            var self = this;
            bookService.getBooksByURL(this.state.nextPageURL).then((result) => {
                self.setState({books: result.results, nextPageURL: result.next, "prevPageURL": result.previous, "pages": Math.ceil(result.count / PAGE_SIZE)})
            });
        } else {
            return;
        }
    }

    gotoPage(pageNumber) {
        // Handle when an specific  pagenumber es clicked
        if (pageNumber <= this.state.pages) { // check for unboound pages
            if (this.state.search || this.state.titleFilter || this.state.yearFilter) {
                var strQuery = "";
                strQuery += this.state.titleFilter ? "?title=" + this.state.titleFilter : "";
                strQuery += this.state.yearFilter ? "&publication_year=" + this.state.yearFilter : "";
                strQuery += this.state.search ? "&search=" + this.state.search: "";
            }
            const pageUrl = strQuery? `${API_URL}/api/books/${strQuery}&page=${pageNumber}`: `${API_URL}/api/books/?page=${pageNumber}`;
            var self = this;
            bookService.getBooksByURL(pageUrl).then((result) => {
                self.setState({books: result.results, nextPageURL: result.next, "prevPageURL": result.previous, "pages": Math.ceil(result.count / PAGE_SIZE)})
            });
        }
    }

    prevPage() {
        // Handle when prev page button is clicked
        if (this.state.prevPageURL) {
            var self = this;
            bookService.getBooksByURL(this.state.prevPageURL).then((result) => {
                self.setState({books: result.results, nextPageURL: result.next, "prevPageURL": result.previous, "pages": Math.ceil(result.count / PAGE_SIZE)})
            });
        } else {
            return;
        }
    }

    render() {

        // Paginator generation
        let pageToReturn = [];
        const pageList = () => {
          for (let i = 0; i < this.state.pages; i++) {
            pageToReturn.push(<li className="page-item"><a className="page-link" onClick={(e)=> this.gotoPage(i+1)}>{i+1}</a></li>);
          }
          return pageToReturn;
        };
        return (
            <div className="book--list">
                <br/>
                { !this.state.exactMatch &&
                    <div className="form-row">
                        <input className={'form-control col-7'} type="search" placeholder="Search for Title or Author" aria-label="Search" onChange={this.handleSearchChange} />
                    </div>
                }
                { this.state.exactMatch &&
                    <div className="form-row">
                        <div className="col-7">
                          <input type="text" className="form-control" placeholder="Title" name="titleFilter" onChange={this.handleChange}/>
                        </div>
                        <div className="col-2">
                          <input type="text" className="form-control" placeholder="Year" name="yearFilter" onChange={this.handleChange}/>
                        </div>
                        <div className="col-auto">
                          <button type="submit" className="btn btn-primary mb-2" onClick={this.handleButtonSearchSubmit}>Search</button>
                        </div>
                    </div>
                }
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exact-match" onChange={this.handleChecked}/>
                    <label className="form-check-label" for="exampleCheck1">exact Match</label>
                </div>
                <br/>
                <table className="table">
                    <thead key="thead">
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publication Year</th>
                            <th>Edition</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.books.map(c => 
                        <tr key={c.pk}>
                            <td>{c.pk}</td>
                            <td>{c.title}</td>
                            <td>{c.author}</td>
                            <td>{c.publication_year}</td>
                            <td>{c.edition}</td>
                            <td>{c.quantity}</td>
                            <td>
                                <button onClick={(e)=> this.handleDelete(e, c.pk)} className={'btn btn-outline-danger btn-sm'}>Delete</button>
                                  
                            </td>

                            <td>
                                <Link to={"/book/" + c.pk} >Update</Link>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div className={'d-flex justify-content-center'}>
                    { this.state.pages > 0 &&
                        <nav aria-label="Page navigation example">
                          <ul className="pagination">
                            <li className="page-item"><a className="page-link" onClick={this.prevPage}>Previous</a></li>
                            {pageList()}
                            <li className="page-item"><a className="page-link" onClick={this.nextPage}>Next</a></li>
                          </ul>
                        </nav>
                    }
                </div>
            </div>
        );
    }
}

export default BookList;

