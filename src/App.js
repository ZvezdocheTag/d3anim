import React, { Component } from 'react';
import Tree from './Tree'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">DATA TREE AI</h1>
        </header>
        {/* <BarChart data={[5,10,1,3]} size={[500,500]}/> */}
        <Tree data={[5,10,1,3]} size={[500,500]}/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
