import actions from './actions';


const actionCreators = {
    establishConnection(socket){
        debugger;
        return () => ({
            type: actions.CONNECTION_ESTABLISHED,
            payload: {socket}
        });
    },
    subscribeChannel(channel){
        return () => ({
            type: actions.SUBSCRIBE_CHANNEL,
            payload: {channel}
        })
    },
    unsubscribeChannel(channel){
        return () => ({
            type: actions.UNSUBSCRIBE_CHANNEL,
            payload: {channel}
        })
    },
    updateTicker(message){
        return () => ({
            type: actions.UPDATE_TICKER,
            payload: {message}
        })
    }
}

export default actionCreators;