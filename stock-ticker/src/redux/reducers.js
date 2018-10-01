import { combineReducers } from 'redux';
import actions from './actions';

export const  connectionReducer = (state = {}, action) => {
        if(action.type === actions.CONNECTION_ESTABLISHED) {
            console.log(`Connection to stock ticker established`);
            return {
                ...state,
                socket: action.payload.socket
            }
        }
        return state;
    }

export const  channelReducer = (state = {}, action) => {
        if(action.type === actions.SUBSCRIBE_CHANNEL) {
            const socket = state.connectionReducer.socket;
            const channels = action.payload.channel.join(',');
            try{
                debugger;
                socket.emit('subscribe', channels);
            }
            catch(err){
                console.error(err);
            }
        }
        else if(action.type === actions.UNSUBSCRIBE_CHANNEL) {
            const socket = state.connectionReducer.socket;
            const channels = action.payload.channel.join(',');            
            try {
                socket.emit('unsubscribe', channels);
            }
            catch(err){
                console.error(err);
            }
        }
        return state;
    }

export const  subscribedStocksReducer = (state = { subscribedStocks: []}, action) => {
        if(action.type === actions.UPDATE_TICKER){            
            const subscribedStocks = action.payload.message;

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

// const reducers = {
//     connectionReducer(state = {}, action){
//         if(action.type === actions.CONNECTION_ESTABLISHED) {
//             console.log(`Connection to stock ticker established`);
//             return {
//                 ...state,
//                 socket: action.payload.socket
//             }
//         }
//         return state;
//     },
//     channelReducer(state = {}, action){
//         if(action.type === actions.SUBSCRIBE_CHANNEL) {
//             const socket = state.connectionReducer.socket;
//             const channels = action.payload.channel.join(',');
//             try{
//                 debugger;
//                 socket.emit('subscribe', channels);
//             }
//             catch(err){
//                 console.error(err);
//             }
//         }
//         else if(action.type === actions.UNSUBSCRIBE_CHANNEL) {
//             const socket = state.connectionReducer.socket;
//             const channels = action.payload.channel.join(',');            
//             try {
//                 socket.emit('unsubscribe', channels);
//             }
//             catch(err){
//                 console.error(err);
//             }
//         }
//         return state;
//     },
//     subscribedStocksReducer(state = { subscribedStocks: []}, action){
//         if(action.type === actions.UPDATE_TICKER){            
//             const subscribedStocks = action.payload.message;

//             return {
//                 ...state,
//                 subscribedStocks
//             }
//         }
        
//         return state;
//     }

// };
// const appReducers = combineReducers(reducers);

// export default appReducers;