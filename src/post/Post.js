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
    }

    handleChangeBzip(value){
        let newItem = Object.assign({}, this.state.newItem, {bzip: value});
        this.setState({  newItem  });
    }

    render(){
        return (
            <div className="post">
                <form className="itemForm">
                    <div className="inputWrappers">
                        <p className="postInputs">What would you like to do?</p>
                        <select className="form-control" name="platform"
                                onChange={this.handleInputChange}
                                id="platform">
                            <option value="FCC challenge">FCC challenge</option>
                            <option value="FCC project">FCC project</option>
                            <option value="Codewars !!">Codewars !!</option>
                        </select>
                    </div>
                    <div className="inputWrappers">
                        <SelectBzip
                            handleChangeBzip={this.handleChangeBzip}
                            what={this.state.newItem.platform}
                        />
                    </div>
                    <div className="inputWrappers">
                        <p className="postInputs">channel</p>
                        <input className="form-control"
                            name="channel" id="channel" type="text"
                               value={this.state.newItem.channel}
                               onChange={this.handleInputChange}
                               placeholder="gitter / discord / slack / etc"
                        />
                    </div>
                    <div className="inputWrappers">
                        <p className="postInputs">username</p>
                        <input className="form-control"
                            name="username" id="username" type="text"
                               value={this.state.newItem.username}
                               onChange={this.handleInputChange}
                               placeholder="username"
                        />
                    </div>
                    <div className="inputWrappers">
                        <p className="postInputs">When:</p>
                        <select  className="form-control"
                                 name="time" onChange={this.handleInputChange}>
                            <option value="I'm starting right now!">
                                I am starting right now, join me!
                            </option>
                            <option value="asap!">asap</option>
                            <option value="in an hour!">in an hour!</option>
                            <option value="today!">today!</option>
                            <option value="this week, lets schedule!">
                                This week, lets schedule!
                            </option>
                        </select>
                    </div>
                    <div className="inputWrappers">
                        <p className="postInputs">username</p>
                        <textarea  className="form-control"
                                   name="freeText" id="freeText" type="text"
                               value={this.state.newItem.freeText}
                               onChange={this.handleInputChange}
                               placeholder="anything you wanna add...."
                        />
                    </div>
                    <input id="submitButton" type="button" className="btn" value="submit"
                           onClick={this.handleSubmit} />
                </form>
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
            <div className="selectBzip">
                <p className="postInputs">{this.props.what === "Codewars !!" ?
                    "plz paste link to kata" : "challenge or project:" }</p>
                <div className="listWrap">
                <div className="list">
                    <input  className="form-control" name="bzip" type="text"
                           onBlur={this.looseFocus}
                           value={this.state.bzip}
                           onChange={this.handleInputChange}
                           autoComplete="off" />
                    <ul style={{ display: this.state.visibility }}>
                        {datalist}
                    </ul>
                </div>
                </div>
            </div>
        )
    }
}
