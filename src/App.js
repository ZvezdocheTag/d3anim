import React, { Component } from 'react';
import DataTree from './components/DataTree'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">DATA TREE AI</h1>
        </header>
        <DataTree />
      </div>
    );
  }
}

export default App;
