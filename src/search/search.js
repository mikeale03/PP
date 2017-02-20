import React from 'react';
import './Search.scss';

export default class Search extends React.Component {
    render(){
        return (
            <div className="search">
                hi from Search and also {this.props.niceProp}
            </div>
        )
    }
}
