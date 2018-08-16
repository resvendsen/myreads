import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ShelfChanger extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		shelves: PropTypes.array.isRequired,
		onMove: PropTypes.func.isRequired
	}

	state = {
		value: (this.props.book.shelf == null ? 'none' : this.props.book.shelf)
	}

	render() {
		const {book, shelves, onMove} = this.props
		const bookId = book.id

		let handleChange = (e) => {
			this.setState({ value: e.target.value })
			const shelfName = e.target.value
			onMove(bookId, shelfName)
			e.preventDefault()
		}

		return (
			<div className="book-shelf-changer">
	          <select onChange={ handleChange } value={ this.state.value }>
	          	{ shelves.map((shelf) => (
	          		<option
	          			key={ shelf.name }
	          			value={ shelf.name }
	          			disabled={ shelf.disable }
	          		>{ shelf.text }</option>
	          	)) }
	          </select>
	        </div>
		)
	}
}

export default ShelfChanger
