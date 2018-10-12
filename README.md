A simple app that uses React Material UI - https://material-ui.com/
Built with React (createReactApp) + Redux
It takes a known stock symbol such as AAPL, GOOGL, YELP etc. and uses socket.io client to display live data. It refreshes only during market hours.
It also uses HTML localStorage to cache the stock symbols that were added to be monitored so that page refresh does not remove. 
It also uses a custom throttler to avoid updating so often as to cause the browser to freeze!

It is a very simple application aimed at demonstrating React Material UI and Redux used with web sockets using socket.io and is not meant to be a full blown stock market monitor.