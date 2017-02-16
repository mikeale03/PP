import React, { Component } from 'react';
import './post.scss';

export default class Post extends React.Component {
    render(){
        return (
            <div className="post">
                hi from Posts and also {this.props.niceProp}
            </div>
        )
    }
}
