import React from 'react';
import './Items.scss';
import axios from 'axios';
import {store} from '../post/Post.js';
import {initialData} from '../post/Post.js';

console.log(store);

export default class Items extends React.Component {
    constructor(){
        super();
        this.state = {
            items: []
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
            that.setState({
                items: store.getState()
            });
        });
    }

    render(){
        return (
            <div className="items">
                <div className="itemWrap">
                    {this.state.items.map(function(v, i){
                        return (
                            <Item v={v} key={i} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

const Item = (props) => {
    let randomStarTwist = Math.random() * 50 *
        (Math.random() > 0.5 ? 1 : -1);
    let twist = {
        transform: "rotate(" + randomStarTwist + "deg)"
    };
    return (
        <div className="itemHoverTwist" key={props.i}>
            <div className="item" >
                <div id="star-five" style={ twist }>
                    <div className="child">
                        POF!
                    </div>
                </div>
                <p>{props.v.bzip}</p>
                <p>{props.v.gittername}</p>
            </div>
        </div>
    )
};
