import React, { Component } from 'react';
import './items.scss';

export default class Items extends React.Component {
    constructor(){
        super();
    }

    render(){
        return (
            <div className="items">
                <div>
                    {this.props.items.map(function(v, i){
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



