import React from 'react';

import { connect } from 'react-redux';
import actionCreators from '../../redux/actionCreators';


const mapStateToProps = (state) => (
    {
        ...state
    }
);
class SearchBox extends React.Component{
    constructor(){
        super();
        this.handleSubscribe = this.handleSubscribe.bind(this);
    }
    state = {
        inputValue: null
    }
    handleSubscribe(evt){
        const { dispatch } = this.props;
        debugger;
        dispatch(actionCreators.subscribeChannel([this.refs.subscriptionList.value]));
    }
    
    render(){
        return (
            <div>
                <input type="text" ref="subscriptionList"></input>    
                <button onClick={this.handleSubscribe}>Subscribe</button> 
            </div>
        );
    }
}

export default connect(mapStateToProps)(SearchBox);
