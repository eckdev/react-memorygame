import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NavBar } from './navbar';
import {GameContext,defaultState} from './GameContext.js';
import { Test } from './Test';

ReactDOM.render(
  <GameContext.Provider value={defaultState}>
  <React.StrictMode>
    <NavBar />
    {/* <App /> */}
    <Test />
  </React.StrictMode>
  </GameContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
