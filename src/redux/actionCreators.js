import actions from './actions';

let io = null;

const throttler = (fn, delay) => {
    let timeout = false;

    return function () {
        let context = this, args = arguments;
        const later = () => {
            timeout = setTimeout(() => {
                fn.apply(context, args);
                timeout = false;
            }, delay);
        }
        if (!timeout) {
            later();
        }
    }
}

const actionCreators = {
    establishConnection(dispatch) {
        try {
            io = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops');
            console.log(`Connection to stock ticker established`);
            const subscriptionList = localStorage.getItem('subscribedChannels');
            if (subscriptionList && subscriptionList.length > 0) {
                let tmpData = subscriptionList.split(',').map((stockSymbol) => {
                    return {
                        symbol: stockSymbol,
                        lastSalePrice: '0.0'
                    }
                });
                dispatch(actionCreators.subscribeChannel(subscriptionList));
            }
            const ioResponder = (message) => {
                dispatch(actionCreators.updateTicker(JSON.parse(message)));
            }
            const throttledIOResponder = throttler(ioResponder, 100);
            // io.on('message', throttledIOResponder);
            io.on('message', ioResponder);
        }
        catch (err) {
            console.error(err);
        }

        return {
            type: actions.ESTABLISH_CONNECTION
        }
    },
    listen() {
        return {
            type: actions.START_LISTEN
        }
    },
    subscribeChannel(channel) {
        const cachedSubList = localStorage.getItem('subscribedChannels');
        let cachedSubArr = [];
        let subscriptionList = [];

        if (cachedSubList && cachedSubList.length) {
            cachedSubArr = cachedSubList.split(',');
            const _channels = channel.split(',');
            const subscriptionSet = new Set([ ...cachedSubArr, ..._channels ]);
            for (let item of subscriptionSet) subscriptionList.push(item);

            // if (subscriptionList.indexOf(channel) < 0) {
            //     subscriptionList.push(channel);
            // }
        }
        else {
            subscriptionList.push(channel);
        }
        localStorage.setItem('subscribedChannels', '');
        localStorage.setItem('subscribedChannels', subscriptionList);

        try{
            io.emit('subscribe', channel);
        }
        catch(err){
            console.error(err);
        }
        return {
            type: actions.SUBSCRIBE_CHANNEL,
            payload: {subscriptionList}
        }
        // return () => ({
        //     type: actions.SUBSCRIBE_CHANNEL,
        //     payload: {channel}
        // })
    },
    unsubscribeChannel(channel, dispatch) {
        const cachedSubList = localStorage.getItem('subscribedChannels');
        let subscriptionList = [];

        // const subscriptionList = localStorage.getItem('subscribedChannels');
        let channels = '';
        if (cachedSubList && cachedSubList.length) {
            subscriptionList = cachedSubList.split(',');
            const ind = subscriptionList.indexOf(channel);
            if ( ind >= 0) {
                subscriptionList.splice(ind, 1);
            }
            localStorage.setItem('subscribedChannels', '');
            localStorage.setItem('subscribedChannels', subscriptionList);
            dispatch(actionCreators.updateTicker({ symbol: channel }, {remove: true}));
        }
        try{
            io.emit('unsubscribe', channel);
        }
        catch(err){
            console.error(err);
        }

        return {
            type: actions.UNSUBSCRIBE_CHANNEL,
            payload: {subscriptionList}
        }
        // return () => ({
        //     type: actions.UNSUBSCRIBE_CHANNEL,
        //     payload: {channel}
        // })
    },
    updateTicker(message, options) {
        return {
            type: actions.UPDATE_TICKER,
            payload: {message, options}
        }
        // return () => ({
        //     type: actions.UPDATE_TICKER,
        //     payload: {message}
        // })
    }
}

export default actionCreators;