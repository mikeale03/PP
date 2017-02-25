import React, { Component }from 'react';
import './items.scss';
import axios from 'axios';
import {store} from '../post/Post.js';
import {initialData, initialChallenges} from '../post/Post.js';
// import circle from '../images/circle.png';
// import { Button } from 'react-bootstrap';


export default class Items extends React.Component {
    constructor(){
        super();
        this.state = {
            items: [],
            searchText: '.'
        };
    }

    componentDidMount(){
        let that = this;
        store.subscribe(function(){
            let storeState = store.getState();
            that.setState({
                items: storeState.items,
                searchText: storeState.searchText
            });
        });
        axios.get('/items')
            .then(function (response) {
                store.dispatch(initialData(response.data.store));
                store.dispatch(initialChallenges(response.data.challengelist.default));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render(){
        let searchText = new RegExp(this.state.searchText, 'i');
        return (
            <div className="items">
                <div className="itemWrap">
                    {this.state.items.filter(function(v){
                        return searchText.test(v.bzip);
                    }).reverse().map(function(v, i){
                        return (
                            <Item v={v} key={i} i={i}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

class Item extends Component {
    constructor(props){
        super(props);
        this.state = {
            info: 'none',
            heightFreeText: 0
        }

    }

    toggleFreeText = () =>{
        if(this.state.heightFreeText){
            this.setState({ heightFreeText: 0 });
        } else {
            this.setState({ heightFreeText: 40 });
        }

    }

    render(){
        if(this.props.i === 0){
            console.log(this.props.v);
        }
        return (
<div className="item">
    <div className="card-header"
         onMouseEnter={this.toggleFreeText}
         onMouseLeave={this.toggleFreeText}
    >
        <div className="card-header-left">
            <p>{this.props.v.bzip}</p>
            <p>{this.props.v.platform}</p>
        </div>
        <div className="card-header-right">
            <p>{this.props.v.channel}</p>
            <p>{this.props.v.username}</p>
        </div>
    </div>
    <div className="freeTextWrap"
         style={{ "height": this.state.heightFreeText }}>
        <div>
            <p>{this.props.v.freeText}</p>
        </div>
    </div>
    <div className="card-bottom">
        <p>{this.props.v.time}</p>
    </div>
</div>
        )
    }
}
