import React, { Component } from 'react';
import Items from './items/Items.js';
import Post from './post/Post.js';
import Search from './search/Search.js';
import logo from './logo.svg';
import './App.scss';
import { Button } from 'react-bootstrap';


class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img id="logo" src={logo} alt="logo" />
                    <h2>Welcome! Go find a pair-programming-partner!</h2>
                    {/*<img src={logo} alt="logo" />*/}
                </div>
                <div className="mainApp row">
                    <div className="col-md-4">
                      <div className="search-post-container">
                        <Search niceProp={'SEARCHProps'} />
                        <Post />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="item-container">
                        <Items />
                      </div>
                    </div>
                </div>
            </div>
            );
        }
    }

export default App;
