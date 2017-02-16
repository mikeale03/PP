import React, { Component } from 'react';
import './items.scss';

export default class Items extends React.Component {
    render(){
        return (
            <div className="items">
                hi from Items and also {this.props.niceProp}
            </div>
        )
    }
}