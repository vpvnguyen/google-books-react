import React, { Component } from 'react';
import SearchResults from '../../components/SearchResults/SearchResults.jsx';
import { TextInput, Button, Icon } from 'react-materialize';

// api
import axios from 'axios';

export default class SearchPage extends Component {


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
            <div className="container">
                <form className="col-md-12">
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

                <SearchResults searchResults={this.state.searchResults} />
            </div>
        )
    }
}