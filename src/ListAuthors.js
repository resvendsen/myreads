import React from 'react'

export default function ListAuthors(props) {
	const { authors } = props

	return (
		<div>
			{ authors.map((author) => (
				<div key={author} className="book-authors">{ author }</div>
			)) }
		</div>
	)
}
