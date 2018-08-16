import React form 'react'

function ListAuthors(props) {
	const { authors } = props
	{ authors.map((author) => (
		<div className="book-authors">{ author }</div>
	) }
})

export default ListAuthors