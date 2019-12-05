import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactAutoCompelete from './ReactAutoComplete';
import indiaState from './indiaState.json';

class App extends Component {

  render() {
    return (
      <div className="App">
        <ReactAutoCompelete
          suggestions={indiaState}
          inputClassName="custom-class"
          inputLable="State"
        />
      </div>
    );
  }
}

export default App;