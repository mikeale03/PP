import React from 'react';
import './search.scss';
import { store } from '../post/Post.js';
import { InputGroup, FormControl } from 'react-bootstrap';

// action
export const SEARCH = { type: 'SEARCH'};

// action creator
const searchItems = (searchText) => {
    return {
        type: SEARCH,
        searchText
    }
};

export default class Search extends React.Component {
    constructor(){
        super();
        this.state = {
            searchText: ''
        };
        this.onChangeText = this.onChangeText.bind(this);
    }

    onChangeText(e){
        var that = this;
        this.setState({  searchText: e.target.value  });
        setTimeout(function(){
            store.dispatch(searchItems(that.state.searchText));
        }, 100);

    }

    render(){
        return (
            <div className="search">
                <form>
                    <InputGroup>
                        <InputGroup.Addon>@</InputGroup.Addon>
                        <FormControl type="text"
                            onChange={this.onChangeText}
                        />
                    </InputGroup>
                </form>
            </div>
        )
    }
}