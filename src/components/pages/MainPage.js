import React from 'react';
import Shelf from '../Shelf';
import * as BooksAPI from '../../BooksAPI'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { books: [] }
  }

  componentDidMount() {
    BooksAPI.getAll().then(response => {
      console.log(response); this.setState({ books: response });
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(resp => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }));
      });
  }

  updateBook = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        BooksAPI.getAll().then(books => {
          this.setState({ books });
        });
      });
    }
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf updateBook={this.updateBook} name="Currently Reading" books={this.state.books.filter(b => b.shelf === "currentlyReading")} />
            <Shelf updateBook={this.updateBook} name="Want To Read" books={this.state.books.filter(b => b.shelf === "wantToRead")} />
            <Shelf updateBook={this.updateBook} name="Read" books={this.state.books.filter(b => b.shelf === "read")} />
          </div>
        </div>
        <div className="open-search">
          <button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/search';
            }}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default MainPage;
