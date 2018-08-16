import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchForBooks from './SearchForBooks'
import LoadShelf from './LoadShelf'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    shelves:
       [{ name: 'move', text: 'Move to...', disable: true },
        { name: 'currentlyReading', text: 'Currently Reading', disable: false },
        { name: 'wantToRead', text: 'Want To Read', disable: false },
        { name: 'read', text: 'Read', disable: false },
        { name: 'none', text: 'None', diasble: false }
       ],
    searchResults: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBooksShelf(bookId, shelfName) {
      if (this.state.books.filter((book) => (book.id === bookId)).length === 0) {
        const tmpBook = this.state.searchResults.filter((book) => (book.id === bookId))[0]
        tmpBook.shelf = shelfName

        this.setState((state) => ({
          books: state.books.concat(tmpBook),
          searchResults: state.searchResults.filter((book) => (book.id !== bookId))
        }))

        BooksAPI.update(tmpBook, shelfName)

      } else {
        const tmpBook = this.state.books.filter((book) => (book.id === bookId))[0]
        tmpBook.shelf = shelfName

        this.setState((state) => ({
          books: state.books.filter((book) => (book.id !== bookId)).concat(tmpBook)
        }))

        BooksAPI.update(tmpBook, shelfName)
      }
  }

  searchLibrary(query) {
    if (query.length > 0) {
      const SEARCH_TERMS = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen',
                            'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business',
                            'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling',
                            'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas',
                            'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future',
                            'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King',
                            'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery',
                            'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming',
                            'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming',
                            'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
      let regex = new RegExp(`^${query}`, 'gi')
      if (SEARCH_TERMS.findIndex((term) => (term.match(regex))) >= 0) {
        BooksAPI.search(query).then((resultBooks) => {
          const state = this.state

          function findBookInBooks(book) {
            const i = state.books.findIndex((bookMyBooks) => (bookMyBooks.id === book.id), BooksApp)
            return (i >= 0 ? state.books[i] : book)
          }

          const tmp = resultBooks.map(findBookInBooks)


          this.setState({
            searchResults: tmp
          })
        })
      } else {
        this.setState({
          searchResults: []
        })
      }
    } else {
      this.setState({
        searchResults: []
      })
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Route path='/search' exact render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to='/' onClick={ () => this.setState({showSearchPage: false}) } className="close-search" >Close</Link>
                <SearchForBooks searchLibrary={ (query) => {this.searchLibrary(query)} }/>
              </div>
              <div className="search-books-results">
                <LoadShelf shelf={ null }
                           books={ this.state.searchResults }
                           shelves={ this.state.shelves }
                           onMove={(bookId, shelfName) => {
                              this.updateBooksShelf(bookId, shelfName)
                           }}
                />
                <Link to='/' onClick={ () => this.setState({showSearchPage: false}) } className='search-books-home-link' >Home</Link>
              </div>
            </div>
          )} />
        ) : (
          <Route path='/' exact render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
                <Link to='/search' onClick={ () => this.setState({showSearchPage: true, searchResults: []}) }
                            className='home-search-books-link' >Search</Link>
              </div>
              <div className="list-books-content">
                <ListBooks books={this.state.books} shelves={this.state.shelves}
                           onMove={(bookId, shelfName) => {
                              this.updateBooksShelf(bookId, shelfName)
                           }}
                />
              </div>
              <div className="open-search">
                <Link to='/search' onClick={ () => this.setState({showSearchPage: true, searchResults: []}) }
                            className='list-books-to-search' >Add a Book</Link>
              </div>
            </div>
          )} />
        )}
      </div>
    )
  }
}

export default BooksApp
