import React from 'react';

import actionCreators from '../../redux/actionCreators';
import { connect } from 'react-redux';

import SearchBox from '../searchBox/searchBox';
import StockList from '../stockList';

const mapStateToProps = (state) => ({
    subscribedStocks: state.subscribedStocksReducer.subscribedStocks
});

class Ticker extends React.Component {
    render() {
        const { subscribedStocks } = this.props;

        // const li = subscribedStocks.map((stock, index) => {
        //     return (
        //         <li key={index}>
        //             <span>{stock.symbol}</span>
        //             <span>{stock.lastSalePrice}</span>
        //         </li>
        //     );
        // });
        return (
            <div>
                <SearchBox />
                <StockList data={subscribedStocks}/>
                {/* <ul>
                    {li}
                </ul> */}
            </div>
        );
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(actionCreators.establishConnection(dispatch));
    }
    // componentWillUnmount() {
    //     this.socket.on('disconnect', () => console.log('Disconnected.'));
    // }
}


export default connect(mapStateToProps)(Ticker);