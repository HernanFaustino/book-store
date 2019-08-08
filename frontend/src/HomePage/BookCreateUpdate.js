import  React, { Component } from  'react';
import BookService from '../Services/BookService';

const bookService = new BookService();

class BookCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            author: "",
            publication_year: "",
            edition: "",
            cover_image: "",
            quantity: "",
            imageChanged: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { match: { params } } =  this.props;
        if (params && params.pk) {
            bookService.getBook(params.pk).then((c) => {
                this.setState(c);
            });
        }
    }

    handleChange(e) {
        const {name, value} = e.target;
        if (name == "cover_image") {
            this.setState({cover_image: e.target.files[0], imageChanged: true});
        } else {
            this.setState({ [name]: value });
        }
    }

    handleCreate() {
        bookService.createBook({
            "title": this.state.title,
            "author": this.state.author,
            "publication_year": this.state.publication_year,
            "edition": this.state.edition,
            "cover_image": this.state.cover_image,
            "quantity": this.state.quantity
        }).then((result) => {
            alert("Book Created");
        }).catch(() => {
            alert("There are somer error, re send the form");
        });
    }

    handleUpdate(pk) {
        var { title, author, publication_year, edition, cover_image, quantity } = this.state;
        if (!this.state.imageChanged) {
            cover_image = null;
        }
        bookService.updateBook({
            "pk": pk,
            "title": title,
            "author": author,
            "publication_year": publication_year,
            "edition": edition,
            "cover_image": cover_image,
            "quantity": quantity
        }).then((result) => {
            alert("Book Updated");
        }).catch(() => {
            alert("There are somer error, re send the form");
        });
    }

    handleSubmit(event) {
        const { match: { params } } = this.props;
        if (params && params.pk) {
            this.handleUpdate(params.pk);
        } else {
            this.handleCreate();
        }

        event.preventDefault();
    }

    render() {
        const cover_image = this.state.cover_image;
        return (
            <div className="row">
                <div class="col-6">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input className="form-control" type="text" name="title" onChange={this.handleChange} value={this.state.title}/>

                            <label>Author</label>
                            <input className="form-control" type="text" name="author" onChange={this.handleChange} value={this.state.author} />

                            <label>Publication year</label>
                            <input className="form-control" type="text" name="publication_year" onChange={this.handleChange} value={this.state.publication_year} />

                            <label>Edition</label>
                            <input className="form-control" type="text" name="edition" onChange={this.handleChange} value={this.state.edition} />

                            <label>Image</label>
                            <input className="form-control" type="file" name="cover_image" onChange={this.handleChange} />

                            <label>Quantity</label>
                            <input className="form-control" type="text" name="quantity" onChange={this.handleChange} value={this.state.quantity} />

                            <input className="btn btn-primary" type="submit" value="Submit" onChange={this.handleChange}/> 
                        </div>
                    </form>
                </div>
                <div className={'col-6 row justify-content-center'}>
                    <img src={cover_image} alt="Cover Image" height="auto" width="auto" />
                </div>
            </div>
        );
    }
}

export default BookCreateUpdate;