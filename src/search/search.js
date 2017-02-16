import React, { Component } from 'react';
import './search.scss';

export default class Search extends React.Component {
    render(){
        return (
            <div className="search">
                hi from Search and also {this.props.niceProp}
            </div>
        )
    }
}
