import React, { Component } from 'react';
import './post.scss';

export default class Post extends React.Component {
    render(){
        return (
            <div className="post">
                <p>hi from Posts and also {this.props.niceProp}</p>

            </div>
        )
    }
}

//
// class MyForm extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             newItem: {
//                 bzip: 'this is data from initial state',
//                 gittername: ''
//             }
//         };
//
//         this.handleInputChange = this.handleInputChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleChangeBzip = this.handleChangeBzip.bind(this);
//     }
//
//     handleSubmit(){
//         console.log('hi from myForm class');
//         this.props.handlePost(this.state.newItem);
//         this.setState({
//             newItem: {
//                 bzip: '',
//                 gittername: ''
//             }
//         });
//         document.getElementById('bzip').focus();
//     }
//
//     handleInputChange(e){
//         const name = e.target.name;
//         let value = e.target.value;
//         let newItem = Object.assign({}, this.state.newItem, {[name]: value});
//         this.setState({
//             newItem
//         });
//     }
//
//     handleChangeBzip(v){
//         let newItem = Object.assign({}, this.state.newItem, {bzip: value});
//         this.setState({  newItem  });
//     }
//
//     render(){
//         return (
//             <form className="itemForm">
//                 bonfire / zipline: <SelectBzip list={bzip} handleBzip={this.handleChangeBzip} />
//                 gittername: <input name="gittername" type="text" value={this.state.newItem.gittername}
//                                    onChange={this.handleInputChange} />
//                 <select name="when">
//                     <option value="I'm starting right now!">I am starting right now, join me!</option>
//                     <option value="asap!">asap</option>
//                     <option value="in an hour!">in an hour!</option>
//                     <option value="today!">today!</option>
//                     <option value="this week, lets schedule!">This week, lets schedule!</option>
//                 </select>
//                 <input id="submitButton" type="button" value="submit"  onClick={this.handleSubmit} />
//             </form>
//         )
//     }
// }
