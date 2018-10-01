import React, { Component } from 'react';
import './App.css';

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import appReducers from '../redux/reducers';

import Ticker from '../components/ticker/ticker';

class App extends Component {
  render() {
    // debugger;
    const store = createStore(appReducers, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
          </header>
          <main>
            <Ticker />
          </main>
        </div> 
      </Provider>
    );
  }

}

export default App;
