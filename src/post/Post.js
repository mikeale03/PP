import React, { Component } from 'react';
import './post.scss';
import axios from 'axios';
import * as redux from "redux";
import { SEARCH } from '../search/Search.js';
// import circle from '../images/circle.png';

// actions
const ADDITEM = {    type: 'ADD'     };
const ADDARR = {     type: "ADDARR"  };
const ADDCHAL = {    type: "ADDCHAL" };

// actionCreator
const addItemAC = (message) => {
    return {
        type: ADDITEM,
        message
    }
};

export const initialData = (messagesArr) => {
    return {
        type: ADDARR,
        messagesArr
    }
};

export const initialChallenges = (challengeList) => {
    return {
        type: ADDCHAL,
        challengeList
    }
};

const defaultState = {
    items: [{bzip: 'Roman', gittername: 'gittername'}],
    searchText: '',
    challengeList: []
};


// reducer
const reducer = (state = defaultState, action) => {
    switch(action.type){
        case ADDITEM: return Object.assign({}, state,
            {items: [...state.items, action.message]});
        case ADDARR: return Object.assign({}, state, {items: [...state.items, ...action.messagesArr]});
        case SEARCH: return Object.assign({}, state,
            {searchText: action.searchText} );
        case ADDCHAL: return Object.assign({}, state, {challengeList: action.challengeList});
        default: return state;
    }
};

// store
export const store = redux.createStore(reducer);

// post component

export default class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newItem: {
                platform: 'FCC challenge',
                bzip: 'this is text from initial state',
                channel: '',
                username: '',
                time: "I'm starting right now!",
                freeText: ''
            },
            length: 0
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeBzip = this.handleChangeBzip.bind(this);
    }

    componentDidMount(){
        let that = this;
        store.subscribe(function(){
            that.setState({
                length: store.getState().items.length
            });
        });
    }

    handleSubmit(){
        let that = this;
        store.dispatch(addItemAC(this.state.newItem));
        axios({
            method: 'post',
            url: '/items/create',
            data: this.state.newItem
        })
        .then(function (response) {
          console.log(response.data);
            that.setState({ items: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
        this.setState({
            newItem: {
                platform: 'FCC challenge',
                bzip: 'this is text from initial state',
                channel: '',
                username: '',
                time: "I'm starting right now!",
                freeText: ''
            }
        });
        document.getElementById('platform').focus();
    }

    handleInputChange(e){
        const name = e.target.name;
        let value = e.target.value;
        let newItem = Object.assign({}, this.state.newItem, {[name]: value});
        this.setState({  newItem  });
        // let that = this;
        // setTimeout(function(){
        //     console.log(that.state.newItem);
        // }, 50)
    }

    handleChangeBzip(value){
        let newItem = Object.assign({}, this.state.newItem, {bzip: value});
        this.setState({  newItem  });
    }

    render(){
        return (
          <div className="card">
            <div className="card-header">

                <h2>Post an Activity</h2>

            </div>
            <div className="card-block ">
              <form className="">
                <div className="form-group">
                  <label htmlFor="platform">What activity?</label>
                  <select className="form-control" name="platform" id="platform" onChange={this.handleInputChange}>
                    <option value="Free Code Camp">Free Code Camp</option>
                    <option value="Codewars">Codewars</option>
                    <option value="Personal Activity">Personal Activity</option>
                  </select>
                </div>
                <SelectBzip
                    handleChangeBzip={this.handleChangeBzip}
                    what={this.state.newItem.platform}
                />
                <div className="form-group">
                  <label htmlFor="channel">Communication Channel</label>
                  <input type="text" className="form-control" name="channel" id="channel"  placeholder="Enter channel: eg. skype, discord, etc.."
                    value={this.state.newItem.channel}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Channel Username</label>
                  <input type="text" className="form-control" name="username" id="username"  placeholder="Enter username"
                    value={this.state.newItem.username}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="information">Additional information</label>
                  <textarea className="form-control" name="freeText" id="freeText" rows="3" maxLength="300"
                    placeholder="Enter additional information"
                    value={this.state.newItem.freeText}
                    onChange={this.handleInputChange}>
                  </textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="schedule">When to start?</label>
                  <input type="text" className="form-control" name="time" id="schedule"  placeholder="Enter schedule"
                    onChange={this.handleInputChange}
                  />
                </div>
              </form>
              <button id="submitButton" className="btn btn-success" onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        )
    }
}

class SelectBzip extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: [],
            bzip: '',
            visibility: 'block'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.pickBzip = this.pickBzip.bind(this);
    }

    componentDidMount(){
        let that = this;
        store.subscribe(function(){
            that.setState({
                list: store.getState().challengeList
            });
        });
    }

    handleInputChange(e){
        this.setState({
            bzip: e.target.value.toLowerCase(),
            visibility: 'block'
        });
    }

    pickBzip(e){
        this.setState({
            bzip: e.target.innerHTML,
            visibility: 'none'
        });
        this.props.handleChangeBzip(e.target.innerHTML);
    }

    looseFocus = () => {
        this.props.handleChangeBzip(this.state.bzip);
    };

    render(){
        let that = this;
        let datalist = this.state.list.filter(function(v){
            let regex = new RegExp(that.state.bzip, 'gi');
            if(!that.state.bzip){
                return false;
            }
            if(regex.test(v)){
                return true;
            } else {
                return false;
            }
        }).map(function(v, i){
            return <li key={i} onClick={that.pickBzip}>{v}</li>
        }).slice(0,5);

        return(
          <div className="form-group">
            <label htmlFor="activity-name">{this.props.what === "Codewars" ?
                "Paste link to kata" : "Challenge/Project name" }</label>
            <input type="text" className="form-control" id="activity-name"  placeholder="Enter activity name"
              onBlur={this.looseFocus}
              value={this.state.bzip}
              onChange={this.handleInputChange}
              autoComplete="off"/>
              <ul style={{ display: this.state.visibility }}>
                  {datalist}
              </ul>
          </div>

        )
    }
}
