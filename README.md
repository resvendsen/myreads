# MyReads Project

This web app allows one to maintain a book reading list by retrieving books from a source master library and
then categorizing the books to be on one of three shelves:  Currently Reading, Want to Read, or Read.  Books
may then be moved from shelf to shelf as their status changes.


## Installation Instructions

There are three steps to complete:

* git clone https://github.com/resvendsen/myreads.git
* at a command prompt enter `npm install`
* then enter `npm start`

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
