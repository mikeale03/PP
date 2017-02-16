import React, { Component } from 'react';
import Items from './Items/Items.js';
import Post from './Post/post.js';
import Search from './Search/search.js';
import logo from './logo.svg';
// import './App.css';
import './App.scss';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} alt="logo" />
                    <h2>Welcome! Go find a pair-programming-partner!</h2>
                    <img src={logo} alt="logo" />
                </div>
                <div className="blue">
                    <Items niceProp={'niceItemProps'} />
                    <Post niceProp={'POSTItemProps'} />
                    <Search niceProp={'SEARCHItemProps'} />
                </div>
            </div>
            );
        }
    }

export default App;
