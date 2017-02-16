import React, { Component } from 'react';
import './Search.scss';

export default class Items extends React.Component {
    render(){
        return (
            <div className="search">
                hi from Search and also {this.props.niceProp}
            </div>
        )
    }
}