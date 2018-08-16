import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import sortBy from 'sort-by'
import LoadShelf from './LoadShelf'

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		shelves: PropTypes.array.isRequired,
		onMove: PropTypes.func.isRequired
	}

	render() {
		const {books, shelves, onMove} = this.props
		return (
/*			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	            <div className="list-books-content">  */
	              <div>
	                {shelves.filter((thisShelf) => (thisShelf.name !== 'move' && thisShelf.name !== 'none')).map((shelf) => (
	                  <div key={ shelf.name } className="bookshelf">
	                  	<h2 className="bookshelf-title">{ shelf.text }</h2>
                  		<div className="bookshelf-books">
                      		<LoadShelf shelf={ shelf } books = { books } shelves={ shelves } onMove={ onMove } />
                  		</div>
	                  </div>
	                ))}
	              </div>
/*	            </div>
	            <div className="open-search">
	              <a onClick={ () => this.setState({showSearchPage: true}) }>Add a book</a>
	            </div>
        	</div>  */
		)
	}
}

export default ListBooks