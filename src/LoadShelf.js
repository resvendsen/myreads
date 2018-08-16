import React from 'react'
import ShelfChanger from './ShelfChanger'
import ListAuthors from './ListAuthors'

export default function LoadShelf(props) {
	const {shelf, books, shelves, onMove} = props

	return (
		<ol className="books-grid">
		{ books.filter((book) => (!book.shelf || shelf == null || book.shelf === shelf.name)).map((book) => (
	      	<li key={ book.id }>
	            <div className="book">
	              <div className="book-top">
	                <div className="book-cover" style={{ width: 128, height: 190,
	                	backgroundImage: (book.imageLinks ? `url(${book.imageLinks.thumbnail})` : null) }}>
	                </div>
	                <ShelfChanger book={ book } shelves={ shelves } onMove={ onMove }/>
	              </div>
	              <div className="book-title">{ book.title }</div>
	              { book.authors ?
	              	<ListAuthors authors={ book.authors }/>
	              	: null
	          	  }
	            </div>
	        </li>
	    )) }
	    </ol>
	)
}