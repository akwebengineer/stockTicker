import { combineReducers } from 'redux';
import actions from './actions';

const updateStock = (subscribedStocks, message, remove) => {
    const sym = message.symbol;
    let stocks = [];
    let found = -1;
    for (let i = 0; i < subscribedStocks.length; i++) {
        stocks.push(subscribedStocks[i]);
        if (subscribedStocks[i].symbol === sym) {
            found = i;
        }
    }
    if (!remove && found >= 0) {
        stocks[found] = message;
    } else if ((!remove & found < 0) || !subscribedStocks.length) {
        stocks.push(message);
    } else if (remove && found >= 0) {
        stocks.splice(found, 1);
    }

    return stocks;
}

export const connectionReducer = (state = {}, action) => {
    return state;
}

export const channelReducer = (state = { channels: [] }, action) => {
    if (action.type === actions.SUBSCRIBE_CHANNEL || action.type === actions.UNSUBSCRIBE_CHANNEL) {
        const channels = action.payload.subscriptionList;

        return {
            ...state,
            channels
        }

    }
    return state;
}

export const subscribedStocksReducer = (state = { subscribedStocks: [] }, action) => {
    if (action.type === actions.UPDATE_TICKER) {
        const { message } = action.payload;
        const remove = (action.payload.options) && action.payload.options.remove;
        let subscribedStocks = updateStock(state.subscribedStocks, message, remove);
        return {
            ...state,
            subscribedStocks
        }
    }
    return state;
}

const appReducers = combineReducers({
    connectionReducer: connectionReducer,
    channelReducer: channelReducer,
    subscribedStocksReducer: subscribedStocksReducer
});

export default appReducers;