import React from 'react';
import './search.scss';
import { store } from '../post/Post.js';

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
                hi from Search and also {this.props.niceProp}
                <input value={this.state.searchText} onChange={this.onChangeText}/>
            </div>
        )
    }
}
