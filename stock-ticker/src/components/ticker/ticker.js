import React from 'react';

import actionCreators from '../../redux/actionCreators';
import { connect } from 'react-redux';

import SearchBox from '../searchBox/searchBox';

const mapStateToProps = (state) => ({
    subscribedStocks: state.subscribedStocksReducer.subscribedStocks
});

class Ticker extends React.Component {
    constructor() {
        super();
        this.socket = null;
    }
    render() {
        const { subscribedStocks } = this.props;
        const li = subscribedStocks.map((stock, index) => {
            return (
                <li key={index}>
                    <span>{stock.symbol}</span>
                    <span>{stock.lastSalePrice}</span>
                </li>
            );
        });
        return (
            <div>
                <SearchBox />
                <ul>
                    {li}
                </ul>
            </div>
        );
    }
    componentDidMount() {
        const { dispatch } = this.props;
        const socket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops');
        socket.on('connect', () => {dispatch(actionCreators.establishConnection(this.socket));});
        socket.on('message', (message) => { dispatch(actionCreators.updateTicker(message)); });
        this.socket = socket;
    }
    componentWillUnmount() {
        this.socket.on('disconnect', () => console.log('Disconnected.'));
    }
}


export default connect(mapStateToProps)(Ticker);