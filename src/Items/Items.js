import React, { Component } from 'react';
import './items.scss';
import axios from 'axios';

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
                console.log('hi from axiox.get in comp All');
                console.log(response);
                that.setState({
                    items: response.data.store
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render(){
        return (
            <div className="items">
                <div>
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
    let randomStarTwist = Math.random() * 50 * (Math.random() > 0.5 ? 1 : -1);
    let twist = {
        transform: "rotate(" + randomStarTwist + "deg)"
    };
    return (
        <div className="item" key={props.i}>
            <div id="star-five" style={ twist }>
                <div className="child">
                    POF!
                </div>
            </div>
            <p>{props.v.bzip}</p>
            <p>{props.v.gittername}</p>
        </div>
    )
};



