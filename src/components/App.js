import React, { Component } from 'react';
import './App.css';

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import appReducers from '../redux/reducers';

import Ticker from '../components/ticker/ticker';

class App extends Component {
  render() {
    const logger = createLogger();
    const store = createStore(appReducers, applyMiddleware(ReduxThunk, logger));
    return (
      <Provider store={store}>
        <div className="App">
          <main>
            <Ticker />
          </main>
        </div>
      </Provider>
    );
  }

}

export default App;
