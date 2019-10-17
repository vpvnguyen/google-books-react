import React, { Component } from 'react';
import { TextInput, Button, Icon } from 'react-materialize';

// api
import axios from 'axios';

export default class SearchBar extends Component {

    state = {
        searchInput: '',
        searchResults: [],
        isSearched: false,
    }

    // user input
    handleChange = event => {
        this.setState({ searchInput: event.target.value });
    }

    // get google books api
    getBooks = event => {
        event.preventDefault();

        const searchInput = this.state.searchInput.trim();
        console.log(`Search Input: ${searchInput}`);

        // get books from google api
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
            .then(res => {
                this.setState({ searchResults: res.data.items })
                console.log(this.state.searchResults);
            })
            .catch(err => {
                if (err) throw err;
            })
    };

    render() {

        return (
            <>
                <form>
                    <TextInput label='Search for a book...'
                        value={this.state.searchInput} onChange={this.handleChange}
                    />
                    <Button type='submit' waves='light'
                        onClick={this.getBooks}
                    >
                        Submit
                    <Icon right>
                            send
                    </Icon>
                    </Button>
                </form>

                {/* map through array of objects and create card */}
                {
                    this.state.searchResults.map(book => (

                        // if wrapped in a container, will lose cascading card style
                        <div className="row" key={book.id}>

                            {book.volumeInfo.title}
                            {book.volumeInfo.authors[0]}
                            {book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'No Rating'}
                            {book.volumeInfo.description}
                            {book.volumeInfo.imageLinks.smallThumbnail}
                            {book.volumeInfo.infoLink}

                        </div>

                    ))
                }
            </>
        )
    }
}