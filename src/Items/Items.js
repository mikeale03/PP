import React, { Component }from 'react';
import './items.scss';
import axios from 'axios';
import {store} from '../post/Post.js';
import {initialData} from '../post/Post.js';
import circle from '../images/circle.png';

console.log(store);

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
        axios.get('/data')
            .then(function (response) {
                store.dispatch(initialData(response.data.store));
            })
            .catch(function (error) {
                console.log(error);
            });
        store.subscribe(function(){
            let storeState = store.getState();
            that.setState({
                items: storeState.items,
                searchText: storeState.searchText
            });
        });
    }

    render(){
        let searchText = new RegExp(this.state.searchText);
        console.log(searchText);
        return (
            <div className="items">
                <div className="itemWrap">
                    {this.state.items.filter(function(v){
                        return searchText.test(v.bzip);
                    }).map(function(v, i){
                        return (
                            <Item v={v} key={i} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

class Item extends Component {
    constructor(props){
        super(props)
        this.state = {
            info: 'none'
        }
    }

    showInfo = () => {
        this.setState({
            info: 'block'
        });
    };

    hideInfo = () => {
        this.setState({
            info: 'none'
        });
    };

    render(){
        let showInfo = { display: this.state.info }
        let randomStarTwist = Math.random() * 50 *
            (Math.random() > 0.5 ? 1 : -1);
        let twist = {
            transform: "rotate(" + randomStarTwist + "deg)"
        };
        return (
            <div className="itemHoverTwist" key={this.props.i}
                 onMouseEnter={this.showInfo}
                 onMouseLeave={this.hideInfo}
            >
                <div className="item" >
                    <div id="star-five" style={ twist }>
                        <div className="child">
                            POF!
                        </div>
                    </div>
                    <p>{this.props.v.bzip}</p>
                    <p style={ showInfo }>{this.props.v.gittername}</p>
                    <p style={ showInfo }>{this.props.v.time}</p>
                </div>
            </div>
        )
    }
}