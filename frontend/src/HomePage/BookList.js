import React, { Component } from 'react';
import BookService from '../Services/BookService';


const bookService = new BookService();

class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            nextPageURL: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        var self = this;
        bookService.getBooks().then(function(result) {
            self.setState({books: result.data, nextPageURL: result.nextlink})
        });
    }

    handleDelete(e, pk) {
        var self = this;
        bookService.deleteBook({pk: pk}).then(() => {
            var newArr = self.state.books.filter(function(obj) {
                return obj.pk !== pk;
            });
            self.setState({books: newArr})
        });
    }

    nextPage() {
        var self = this;
        bookService.getBooksByURL(this.state.nextPageURL).then((result) => {
            self.setState({books: result.data, nextPageURL: result.nextlink})
        });
    }

    render() {
        return (
            <div className="book--list">
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
                                <button onClick={(e)=> this.handleDelete(e, c.pk)}>Delete</button>
                                <a href={"/book/" + c.pk}> Update</a>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={this.nextPage}>Next Page</button>
            </div>
        );
    }
}

export default BookList;

