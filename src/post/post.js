import React, { Component } from 'react';
import './Post.scss';
import axios from 'axios';
import * as redux from "redux";

// actions
const ADDITEM = {    type: 'ADD'    };
const ADDARR = {     type: "ADDARR" };

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

const defaultState = {
    items: [{bzip: 'Roman', gittername: 'gittername'}]
};

// reducer
const reducer = (state = defaultState, action) => {
    switch(action.type){
        case ADDITEM: return [action.message, ...state];
        case ADDARR: return [...action.messagesArr];
        default: return state;
    }
};

// store
export const store = redux.createStore(reducer);

store.subscribe(function(){
    console.log(store.getState())
});



let bzip = ["aone", "aone", "aone", "aone", "aone",
    "aone", "aone", "aone", "aone", "aone", "aone",
    "aone", "aone", "aone", "aone", "aone", "aone",
    "aone", "aone", "aone", "aone", "aone", "atwo",
    "athree", "afour", "afive", "asix",
    "asevenpppppppppppppppppppppppp", "aeight", "anine", "aten"];


export default class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newItem: {
                bzip: 'this is text from initial state',
                gittername: 'gittername'
            },
            length: 0
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeBzip = this.handleChangeBzip.bind(this);
    }

    handleSubmit(){
        let that = this;
        store.dispatch(addItemAC(this.state.newItem));
        axios({
            method: 'post',
            url: '/newItem',
            data: this.state.newItem})
            .then(function (response) {
                that.setState({ items: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({
            newItem: {
                bzip: '',
                gittername: ''
            }
        });
        store.subscribe(function(){
            that.setState({
                length: store.getState().length
            });
        });
        document.getElementById('gittername').focus();
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
                {this.state.length}
                <form className="itemForm">
                    <div className="inputWrappers">
                        <SelectBzip list={bzip}
                                    handleChangeBzip={this.handleChangeBzip} />
                    </div>
                    <div className="inputWrappers">
                        <input name="gittername" id="gittername" type="text"
                               placeholder="gittername"
                               value={this.state.newItem.gittername}
                               onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="inputWrappers">
                        <p className="postInputs">When:</p>
                        <select name="when">
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
                    <input id="submitButton" type="button" value="submit"
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
            bzip: '',
            visibility: 'block'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.pickBzip = this.pickBzip.bind(this);
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
    }

    render(){
        let that = this;
        let datalist = this.props.list.filter(function(v){
            let regex = new RegExp(that.state.bzip);
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
                <p className="postInputs">bonfire / zipline:</p>
                <div className="listWrap">
                <div className="list">
                    <input name="bzip" type="text"
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
